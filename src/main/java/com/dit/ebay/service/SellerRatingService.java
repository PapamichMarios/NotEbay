package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.SellerRating;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.SellerRatingRepository;
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
//@Transactional
public class SellerRatingService {

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private UserRepository userRepository;

    //@Transactional
    public ResponseEntity<?> createSellerRating(Long userId, UserDetailsImpl currentUser, RatingRequest ratingRequest) {

        if (userId.equals(currentUser.getId())) {
            throw new AppException("Sorry, users can't rate their self.");
        }

        User userBidder = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        User userSeller = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        SellerRating sellerRating = new SellerRating(ratingRequest);
        sellerRating.setUserSeller(userSeller);
        sellerRating.setUserBidder(userBidder);

        SellerRating result = sellerRatingRepository.save(sellerRating);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{sellerRatingId}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Seller Rating created successfully.", result));
    }
}
