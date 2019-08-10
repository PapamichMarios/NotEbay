package com.dit.ebay.controller;

import com.dit.ebay.request.ItemRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/*
 * Only for users with role SELLER
 */
@RestController
@RequestMapping("/app/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> insertItem(@Valid @RequestBody ItemRequest itemRequest,
                                        @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.insertItem(currentUser.getId(), itemRequest);
    }

}
