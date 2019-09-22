package com.dit.ebay.controller;

import com.dit.ebay.lsh.Recommendation;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.EnableRequest;
import com.dit.ebay.response.*;
import com.dit.ebay.service.BidderRatingService;
import com.dit.ebay.service.RecommendationService;
import com.dit.ebay.service.SellerRatingService;
import com.dit.ebay.util.PaginationConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.dit.ebay.model.User;
import com.dit.ebay.request.SignInRequest;
import com.dit.ebay.request.SignUpRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import com.dit.ebay.security.UserDetailsImpl;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/app")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SellerRatingService sellerRatingService;

    @Autowired
    private BidderRatingService bidderRatingService;

    @Autowired
    private RecommendationService recommendationService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    /*
     * The following endpoints are for all Users
     */
    @PostMapping("users")
    @ResponseBody
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        return userService.signUpUser(signUpRequest);
    }

    @PostMapping("signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        return userService.signInUser(signInRequest);
    }


    /*
     * The following endpoints are for ADMIN Only
     */
    // Returns all Users in the database to display it
    // Maybe change it from /users/all => /users
    @GetMapping("/users/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PagedResponse<User> getAllUsers(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                           @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                           @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.getAllUsers(currentUser.getId(), page, size);
    }

    // Given an Id
    // Admin enables or disables him
    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User updateUserEnableById(@PathVariable(value = "userId") Long userId,
                                     @Valid @RequestBody EnableRequest enableRequest,
                                     @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.updateUserEnableById(userId, enableRequest);
    }

    // Given an Id
    // Admin deletes user
    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUserById(@PathVariable(value = "userId") Long userId,
                                            @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.deleteUserById(userId);
    }

    // can remove it and only use the above mapping
    @GetMapping("/users/profile")
    //@PreAuthorize("hasRole('ROLE_SELLER')") //every user is seller & bidder here we check for one role only
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public ProfileResponse getLoggedInUserProfile(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.getUserById(currentUser.getId());
    }


    // Given an Id of a user
    // Gets his profile
    @GetMapping("/users/{userId}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ProfileResponse getUserById(@PathVariable(value = "userId") Long userId) {
        return userService.getUserById(userId);

    }

    /*
     * Activity returns paginated bids and items of user seller/bidder
     */
    @GetMapping(path = "/users/{userId}/activity", params = {"page", "size"})
    public CompositePagedResponse<ItemResponse, BidResponse> getUserActivity(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                                             @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                                             @PathVariable(value = "userId") Long userId) {
        return userService.getUserActivity(userId, page, size);
    }

    @GetMapping("/users/{userId}/sellerRatings")
    public PagedResponse<RatingResponse> getSellerRatings(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                          @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                          @PathVariable(value = "userId") Long userId) {
        return sellerRatingService.getRatings(userId, page, size);
    }

    @GetMapping("/users/{userId}/bidderRatings")
    public PagedResponse<RatingResponse> getBidderRatings(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                          @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                          @PathVariable(value = "userId") Long userId) {
        return bidderRatingService.getRatings(userId, page, size);
    }

    //------------Recommendation
    @GetMapping("/recommend")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public List<ItemResponse> recommendation(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return recommendationService.Recommendation(currentUser.getId());
    }
}