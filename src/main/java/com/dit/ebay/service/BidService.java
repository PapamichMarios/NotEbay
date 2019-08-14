package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.BidRequest;
import com.dit.ebay.response.ApiResponse;
import com.dit.ebay.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Service
public class BidService {

    @Autowired
    BidRepository bidRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ItemRepository itemRepository;

    // TODO : check dates for bid
    public ResponseEntity<?> createBid(Long itemId, BidRequest bidRequest, UserDetailsImpl currentUser) {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() ->  new ResourceNotFoundException("Item", "id", itemId));

        if (!item.isActive()) {
            throw new AppException("Sorry, You can't bid on Item which isn't active.");
        }

        Long userId = currentUser.getId();


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Bid bid = new Bid(bidRequest.getBidAmount());

        bid.setUser(user);
        bid.setItem(item);

        Bid result = bidRepository.save(bid);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{itemId}")
                .buildAndExpand(bid.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Bid created successfully.", result));
    }
}
