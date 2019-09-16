package com.dit.ebay.controller;

import com.dit.ebay.request.RatingRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.SellerRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/app/users/{userId}/sellerRating")
public class SellerRatingController {

    @Autowired
    private SellerRatingService sellerRatingService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public ResponseEntity<?> createSellerRating(@PathVariable(value = "userId") Long userId,
                                                @Valid @RequestBody RatingRequest ratingRequest,
                                                @Valid @CurrentUser UserDetailsImpl currentUser) {
        return sellerRatingService.createSellerRating(userId, currentUser, ratingRequest);
    }

    @GetMapping("/ratedAlready")
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public boolean getRatedAlready(@PathVariable(value = "userId") Long userId,
                                   @RequestParam Long itemId,
                                   @Valid @CurrentUser UserDetailsImpl currentUser) {
        return sellerRatingService.getRatedAlready(userId, currentUser, itemId);
    }


}
