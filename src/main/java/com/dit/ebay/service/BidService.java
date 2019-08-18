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
import com.dit.ebay.response.BidResponse;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.util.PagedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

    public ResponseEntity<?> createBid(Long itemId, BidRequest bidRequest, UserDetailsImpl currentUser) {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() ->  new ResourceNotFoundException("Item", "id", itemId));

        if (!item.isActive()) {
            throw new AppException("Sorry, You can't bid on Item which isn't active.");
        }

        if (item.getFirstBid() > bidRequest.getBidAmount()) {
            throw new AppException("Sorry, You can't bid on Item with less money than the minimum bid.");
        }

        Long userId = currentUser.getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Bid bid = new Bid(bidRequest.getBidAmount());

        // Create bid
        bid.setUser(user);
        bid.setItem(item);
        Bid bidRes = bidRepository.save(bid);

        Bid bestBid = itemRepository.findBestBidByItemId(item.getId()).orElse(null);

        if (bestBid == null || bid.getBidAmount() > bestBid.getBidAmount()) {
            item.setBestBid(bidRes);
        }

        // Update counter
        item.increaseNumOfBids();
        itemRepository.save(item);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{bidId}")
                .buildAndExpand(bid.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Bid created successfully.", bidRes));
    }

    public PagedResponse<BidResponse> getBids(Long itemId, UserDetailsImpl currentUser, int page, int size) {

        // safe check here
        authorizationService.isSellerOfItem(currentUser.getId(), itemId);
        validatePageParametersService.validate(page, size);

        Page<Bid> bidsPaged = bidRepository.findByItemId(itemId, PageRequest.of(page, size, Sort.by("id").descending()));
        if (bidsPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), bidsPaged.getNumber(),
                    bidsPaged.getSize(), bidsPaged.getTotalElements(),
                    bidsPaged.getTotalPages(), bidsPaged.isLast());
        }

        List<BidResponse> bidResponses = new ArrayList<BidResponse>();
        for (Bid bid : bidsPaged) {
            bidResponses.add(new BidResponse(bid));
        }

        return new PagedResponse<>(bidResponses, bidsPaged.getNumber(),
                bidsPaged.getSize(), bidsPaged.getTotalElements(),
                bidsPaged.getTotalPages(), bidsPaged.isLast());
    }
}
