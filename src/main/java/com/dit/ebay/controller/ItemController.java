package com.dit.ebay.controller;

import com.dit.ebay.model.Item;
import com.dit.ebay.request.ItemRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/*
 * Only for users with role SELLER
 */
@RestController
@RequestMapping("/app/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> createItem(@Valid @RequestBody ItemRequest itemRequest,
                                        @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.createItem(currentUser, itemRequest);
    }

    // Get currents Logged in item info
    @GetMapping("/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item getUserItemById(@PathVariable(value = "itemId") Long itemId,
                                @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getUserItemById(itemId, currentUser);
    }

    @PutMapping("/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item updateItemById(@PathVariable(value = "itemId") Long itemId,
                               @Valid @RequestBody ItemRequest itemRequest,
                               @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.updateItemById(itemId, itemRequest, currentUser);
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> deleteItemById(@PathVariable(value = "itemId") Long itemId,
                                            @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.deleteItemById(itemId);
    }

}
