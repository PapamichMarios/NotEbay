package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.BidderRating;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidderRatingRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.RatingRequest;
import com.dit.ebay.response.ApiResponse;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.response.RatingResponse;
import com.dit.ebay.response.SearchResponse;
import com.dit.ebay.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BidderRatingService {

    @Autowired
    private BidderRatingRepository bidderRatingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

    public ResponseEntity<?> createBidderRating(Long userId, UserDetailsImpl currentUser, RatingRequest ratingRequest) {

        if (userId.equals(currentUser.getId())) {
            throw new AppException("Sorry, users can't rate their self.");
        }

        User userBidder = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        User userSeller = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Item item = itemRepository.findById(ratingRequest.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", ratingRequest.getItemId()));

        BidderRating bidderRating = new BidderRating(ratingRequest);
        bidderRating.setUserSeller(userSeller);
        bidderRating.setUserBidder(userBidder);
        bidderRating.setItem(item);

        BidderRating result = bidderRatingRepository.save(bidderRating);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{bidderRatingId}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Bidder Rating created successfully.", result));
    }

    public boolean getRatedAlready(Long userId, UserDetailsImpl currentUser, Long itemId) {
        if (itemId < 0) {
            throw new ResourceNotFoundException("Item", "id", itemId);
        }
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        return bidderRatingRepository.findAlreadyRating(userId, currentUser.getId(), itemId).orElse(null) != null;
    }

    private PagedResponse<RatingResponse> createPagedResponse(Page<BidderRating> bidderRatingPaged) {
        if (bidderRatingPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), bidderRatingPaged.getNumber(),
                    bidderRatingPaged.getSize(), bidderRatingPaged.getTotalElements(),
                    bidderRatingPaged.getTotalPages(), bidderRatingPaged.isLast());
        }

        List<RatingResponse> bidderRatings = new ArrayList<>();
        for (BidderRating bidderRating : bidderRatingPaged) {
            RatingResponse ratingResponse = new RatingResponse(bidderRating);
            bidderRatings.add(ratingResponse);
        }

        return new PagedResponse<>(bidderRatings, bidderRatingPaged.getNumber(),
                bidderRatingPaged.getSize(), bidderRatingPaged.getTotalElements(),
                bidderRatingPaged.getTotalPages(), bidderRatingPaged.isLast());
    }

    public PagedResponse<RatingResponse> getRatings(Long userId, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<BidderRating> bidderRatingPaged = bidderRatingRepository.findByBidderId(userId, PageRequest.of(page,size));
        return createPagedResponse(bidderRatingPaged);
    }
}