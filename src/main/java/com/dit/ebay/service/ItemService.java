package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.util.JsonGeoPoint;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.ItemRequest;
import com.dit.ebay.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.jws.Oneway;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuthorizationService authorizationService;

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

        // TODO : image-path and categories store
        Item item = new Item(itemRequest);

        item.setUser(user);
        Item result = itemRepository.save(item);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{itemId}")
                .buildAndExpand(item.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Item created successfully.", result));
    }

    /*
     * Remember the itemRequest must be filled with the old info + the new (changed fields)
     * Update only before the first bid or when its active
     */
    public Item updateItemById(Long itemId, ItemRequest itemRequest, UserDetailsImpl currentUser) {

        // safe check here
        authorizationService.isSellerOfItem(currentUser.getId(), itemId);

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));

        if (!item.isActive()) {
            throw new AppException("Sorry, You can't update an Item which isn't active.");
        }

        if (bidRepository.findItemsBidsByItemId(itemId)) {
            throw new AppException("Sorry, You can't update an Item which has at least 1 bid.");
        }

        item.updateItemFields(itemRequest);

        return itemRepository.save(item);
    }

    public ResponseEntity<?> deleteItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        itemRepository.delete(item);

        return ResponseEntity.ok().body(new ApiResponse(true, "Item Deleted Successfully."));
    }

}
