package com.dit.ebay.service;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.BidderRating;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidderRatingRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.RatingRequest;
import com.dit.ebay.response.ApiResponse;
import com.dit.ebay.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Service
public class BidderRatingService {

    @Autowired
    private BidderRatingRepository bidderRatingRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> createBidderRating(Long userId, UserDetailsImpl currentUser, RatingRequest ratingRequest) {
        User userBidder = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        User userSeller = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        BidderRating bidderRating = new BidderRating(ratingRequest);
        bidderRating.setUserSeller(userSeller);
        bidderRating.setUserBidder(userBidder);

        BidderRating result = bidderRatingRepository.save(bidderRating);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{bidderRatingId}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Bidder Rating created successfully.", result));
    }
}