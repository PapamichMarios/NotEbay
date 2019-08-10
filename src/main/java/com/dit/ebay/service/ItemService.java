package com.dit.ebay.service;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Item;
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

import java.net.URI;

@Service
public class ItemService {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public ResponseEntity<?> insertItem(Long userId, ItemRequest itemRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // TODO : add more input to the constructor
        Item item = new Item(itemRequest.getName(), itemRequest.getDescription(), itemRequest.getTimeEnds(),
                             itemRequest.getBuyPrice(), itemRequest.getFirstBid(),
                             null, null, null, null);

        item.setUser(user);
        Item result = itemRepository.save(item);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{itemId}")
                .buildAndExpand(item.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Item created successfully.", result));
    }
}
