package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.CategoryRepository;
import com.dit.ebay.repository.SellerRatingRepository;
import com.dit.ebay.request.ItemActiveRequest;
import com.dit.ebay.response.*;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.util.JsonGeoPoint;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.ItemRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
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

    private static final Logger logger = LoggerFactory.getLogger(ItemService.class);

    public ResponseEntity<?> createItem(UserDetailsImpl currentUser, ItemRequest itemRequest) {

        if (itemRequest.getName() == null) {
            throw new AppException("Sorry, You can't create an item without providing a name");
        }

        Long userId = currentUser.getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Get lat and long of item
        JsonGeoPoint jgp = itemRequest.getJgp();

        // TODO : image-path
        Item item = new Item(itemRequest);

        item.setUser(user);
        Item result = itemRepository.save(item);

        List<String> categoriesNames = itemRequest.getCategoriesNames();
        // Insert categories here
        for (String categoryStr : categoriesNames) {
            // safe check here
            if (categoryRepository.findByItemIdAndCategoryStr(item.getId(), categoryStr).isEmpty()) {
                Category category = new Category(categoryStr);
                category.setItem(result);
                categoryRepository.save(category);
            }
        }

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{itemId}")
                .buildAndExpand(item.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Item created successfully.", result));
    }

    // constructs paged response
    // will only be used inside this class
    private PagedResponse<ItemResponse> createPagedResponse(Page<Item> itemsPaged) {
        if (itemsPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), itemsPaged.getNumber(),
                    itemsPaged.getSize(), itemsPaged.getTotalElements(),
                    itemsPaged.getTotalPages(), itemsPaged.isLast());
        }

        List<ItemResponse> itemResponses = new ArrayList<>();
        for (Item item : itemsPaged) {
            ItemResponse itemResponse = new ItemResponse(item);
            itemResponse.setRating(sellerRatingRepository.avgRatingByUserId(item.getUser().getId()).orElse(null));
            itemResponses.add(itemResponse);
        }

        return new PagedResponse<>(itemResponses, itemsPaged.getNumber(),
                itemsPaged.getSize(), itemsPaged.getTotalElements(),
                itemsPaged.getTotalPages(), itemsPaged.isLast());
    }


    public PagedResponse<ItemResponse> getSellerItems(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<Item> itemsPaged = itemRepository.findByUserId(currentUser.getId(), PageRequest.of(page, size, Sort.by("id").descending()));
        return createPagedResponse(itemsPaged);
    }

    public Item getSellerItemById(Long itemId, UserDetailsImpl currentUser) {

        // safe check here
        authorizationService.isSellerOfItem(currentUser.getId(), itemId);

        return itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
    }

    /*
     * Remember the itemRequest must be filled with the old info + the new (changed fields)
     * Update only before the first bid or when its active
     */
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

    public ResponseEntity<?> deleteSellerItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        itemRepository.delete(item);

        return ResponseEntity.ok().body(new ApiResponse(true, "Item Deleted Successfully."));
    }

    public BidderItemResponse getBidderItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));

        BidderItemResponse bidderItemResponse = new BidderItemResponse(item);
        bidderItemResponse.setRating(sellerRatingRepository.avgRatingByUserId(item.getUser().getId()).orElse(null));
        return bidderItemResponse;
    }

    public PagedResponse<ItemResponse> getBestBidItems(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<Item> itemsPaged = itemRepository.findBestBidItemsByUserId(currentUser.getId(), PageRequest.of(page, size,
                                                                        Sort.by("timeEnds").descending()));
        return createPagedResponse(itemsPaged);
    }

    public PagedResponse<ItemResponse> getBidsWonItems(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page, size);

        Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
        currentTimeStamp.setNanos(0); // don't count millis

        Page<Item> itemsPaged = itemRepository.findWonItemsByUserId(currentUser.getId(), currentTimeStamp, PageRequest.of(page, size,
                Sort.by("timeEnds").descending()));

        return createPagedResponse(itemsPaged);
    }
}
