package com.dit.ebay.controller;

import com.dit.ebay.request.RatingRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.BidderRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/app/users/{userId}/bidderRating")
public class BidderRatingController {

    @Autowired
    private BidderRatingService bidderRatingService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> createBidderRating(@PathVariable(value = "userId") Long userId,
                                                @Valid @RequestBody RatingRequest ratingRequest,
                                                @Valid @CurrentUser UserDetailsImpl currentUser) {
        return bidderRatingService.createBidderRating(userId, currentUser, ratingRequest);
    }

}
