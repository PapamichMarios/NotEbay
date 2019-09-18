package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Image;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.*;
import com.dit.ebay.request.ItemActiveRequest;
import com.dit.ebay.response.*;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.util.JsonGeoPoint;
import com.dit.ebay.model.User;
import com.dit.ebay.request.ItemRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
//@Transactional
public class ItemService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageRepository imageRepository;

    private static final Logger logger = LoggerFactory.getLogger(ItemService.class);

    //@Transactional
    public ResponseEntity<?> createItem(UserDetailsImpl currentUser, ItemRequest itemRequest) {

        if (itemRequest.getName() == null) {
            throw new AppException("Sorry, You can't create an item without providing a name");
        }

        BigDecimal buyPrice = itemRequest.getBuyPrice();
        BigDecimal firstBid = itemRequest.getFirstBid();
        if (buyPrice != null && buyPrice.compareTo(firstBid) < 0) {
            throw new AppException("Sorry, You can't create an item with first bid bigger than the buy Price");
        }

        Long userId = currentUser.getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Get lat and long of item
        JsonGeoPoint jgp = itemRequest.getJgp();

        Item item = new Item(itemRequest);

        item.setUser(user);

        Long lastCategoryId = itemRequest.getLastCategoryId();
        if (lastCategoryId != null) {
            Category lastCategory = categoryRepository.findById(lastCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", lastCategoryId));
            item.setCategory(lastCategory);
        }
        Item result = itemRepository.save(item);

        // insert photos
        for (MultipartFile image : itemRequest.getImages()) {
            String imageName = imageService.store(image);
            Image imageIn = new Image(imageName);
            imageIn.setItem(item);
            imageRepository.save(imageIn);
        }

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{itemId}")
                .buildAndExpand(item.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Item created successfully.", result));
    }

    //@Transactional
    // constructs paged response
    // will only be used inside this class
    public PagedResponse<ItemResponse> createPagedResponse(Page<Item> itemsPaged) {
        if (itemsPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), itemsPaged.getNumber(),
                    itemsPaged.getSize(), itemsPaged.getTotalElements(),
                    itemsPaged.getTotalPages(), itemsPaged.isLast());
        }

        List<ItemResponse> itemResponses = new ArrayList<>();
        for (Item item : itemsPaged) {
            ItemResponse itemResponse = new ItemResponse(item);
            List<Category> categories = categoryService.getCategoriesReversed(item);
            itemResponse.setCategories(categories);
            itemResponse.setRating(sellerRatingRepository.avgRatingByUserId(item.getUser().getId()).orElse(null));
            itemResponse.setImages(imageService.getImageResourcesFirst(item));
            boolean finished = item.itemIsFinished();
            if (finished && item.isActive()) {
                item.setActive(false);
                itemResponse.setActive(false);
                itemRepository.save(item);
            }
            itemResponse.setFinished(finished);
            itemResponses.add(itemResponse);
        }

        return new PagedResponse<>(itemResponses, itemsPaged.getNumber(),
                itemsPaged.getSize(), itemsPaged.getTotalElements(),
                itemsPaged.getTotalPages(), itemsPaged.isLast());
    }

    //@Transactional
    public PagedResponse<ItemResponse> getSellerItems(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<Item> itemsPaged = itemRepository.findByUserId(currentUser.getId(), PageRequest.of(page, size, Sort.by("id").descending()));
        return createPagedResponse(itemsPaged);
    }

    //@Transactional
    // overload
    public PagedResponse<ItemResponse> getSellerItems(User currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<Item> itemsPaged = itemRepository.findByUserId(currentUser.getId(), PageRequest.of(page, size, Sort.by("id").descending()));
        return createPagedResponse(itemsPaged);
    }

    //@Transactional
    public OwnerItemResponse getSellerItemById(Long itemId, UserDetailsImpl currentUser) {

        // safe check here
        authorizationService.isSellerOfItem(currentUser.getId(), itemId);

        Item item =  itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        List<Category> categories = categoryService.getCategoriesReversed(item);
        OwnerItemResponse ownerItemResponse = new OwnerItemResponse(item);
        ownerItemResponse.setCategories(categories);
        ownerItemResponse.setImages(imageService.getImageResources(item));


        // check dates
        // maybe remove it WARNING
        boolean finished = item.itemIsFinished();
        if (finished && item.isActive()) {
            item.setActive(false);
            ownerItemResponse.setActive(false);
            itemRepository.save(item);
        }
        ownerItemResponse.setFinished(finished);
        return ownerItemResponse;
    }

    /*
     * Remember the itemRequest must be filled with the old info + the new (changed fields)
     * Update only before the first bid or when its active
     */
    //@Transactional
    public Item updateSellerItemById(Long itemId, ItemRequest itemRequest, UserDetailsImpl currentUser) {

        // safe check here
        authorizationService.isSellerOfItem(currentUser.getId(), itemId);

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));

        if (item.isActive()) {
            throw new AppException("Sorry, You can't update an Item which is active.");
        }

        if (itemRepository.countBidsByItemId(itemId)) {
            throw new AppException("Sorry, You can't update an Item which has at least 1 bid.");
        }

        item.updateItemFields(itemRequest);

        return itemRepository.save(item);
    }

    //@Transactional
    public Item updateSellerItemById(Long itemId, ItemActiveRequest itemActiveRequest, UserDetailsImpl currentUser) {
        // safe check here
        authorizationService.isSellerOfItem(currentUser.getId(), itemId);

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));

        if (item.isActive()) {
            throw new AppException("Sorry, You can't update an Item which is active.");
        }

        if (itemRepository.countBidsByItemId(itemId)) {
            throw new AppException("Sorry, You can't update an Item which has at least 1 bid.");
        }

        item.setActive(itemActiveRequest.isActive());

        return itemRepository.save(item);
    }

    //@Transactional
    public ResponseEntity<?> deleteSellerItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        itemRepository.delete(item);

        return ResponseEntity.ok().body(new ApiResponse(true, "Item Deleted Successfully."));
    }

    //@Transactional
    public BidderItemResponse getBidderItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        List<Category> categories = categoryService.getCategoriesReversed(item);
        BidderItemResponse bidderItemResponse = new BidderItemResponse(item);
        bidderItemResponse.setCategories(categories);
        BigDecimal sellerRating = sellerRatingRepository.avgRatingByUserId(item.getUser().getId()).orElse(null);
        if (sellerRating == null) {
            sellerRating = new BigDecimal("0");
        }
        bidderItemResponse.setRating(sellerRating);
        bidderItemResponse.setReputation(sellerRatingRepository.reputationRatingByUserId(item.getUser().getId()).orElse(null));
        bidderItemResponse.setImages(imageService.getImageResources(item));
        // check dates
        // maybe remove it WARNING
        boolean finished = item.itemIsFinished();
        if (finished && item.isActive()) {
            item.setActive(false);
            bidderItemResponse.setActive(false);
            itemRepository.save(item);
        }
        bidderItemResponse.setFinished(finished);
        return bidderItemResponse;
    }

    //@Transactional
    public PagedResponse<ItemResponse> getBestBidItems(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<Item> itemsPaged = itemRepository.findBestBidItemsByUserId(currentUser.getId(), PageRequest.of(page, size,
                                                                        Sort.by("timeEnds").descending()));
        return createPagedResponse(itemsPaged);
    }

    //@Transactional
    public PagedResponse<ItemResponse> getBidsWonItems(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
        currentTimeStamp.setNanos(0); // don't count millis

        Page<Item> itemsPaged = itemRepository.findWonItemsByUserId(currentUser.getId(), currentTimeStamp, PageRequest.of(page, size,
                Sort.by("timeEnds").descending()));

        return createPagedResponse(itemsPaged);
    }
}
