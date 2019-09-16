package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.BidderRating;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.SellerRating;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.SellerRatingRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.RatingRequest;
import com.dit.ebay.response.ApiResponse;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.response.RatingResponse;
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
//@Transactional
public class SellerRatingService {

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

    //@Transactional
    public ResponseEntity<?> createSellerRating(Long userId, UserDetailsImpl currentUser, RatingRequest ratingRequest) {

        if (userId.equals(currentUser.getId())) {
            throw new AppException("Sorry, users can't rate their self.");
        }

        User userBidder = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        User userSeller = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Item item = itemRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", ratingRequest.getItemId()));

        SellerRating sellerRating = new SellerRating(ratingRequest);
        sellerRating.setUserSeller(userSeller);
        sellerRating.setUserBidder(userBidder);
        sellerRating.setItem(item);

        SellerRating result = sellerRatingRepository.save(sellerRating);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{sellerRatingId}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Seller Rating created successfully.", result));
    }

    public boolean getRatedAlready(Long userId, UserDetailsImpl currentUser, Long itemId) {
        if (itemId < 0) {
            throw new ResourceNotFoundException("Item", "id", itemId);
        }
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        return sellerRatingRepository.findAlreadyRating(userId, currentUser.getId(), itemId).orElse(null) != null;
    }

    private PagedResponse<RatingResponse> createPagedResponse(Page<SellerRating> sellerRatingPaged) {
        if (sellerRatingPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), sellerRatingPaged.getNumber(),
                    sellerRatingPaged.getSize(), sellerRatingPaged.getTotalElements(),
                    sellerRatingPaged.getTotalPages(), sellerRatingPaged.isLast());
        }

        List<RatingResponse> sellerRatings = new ArrayList<>();
        for (SellerRating sellerRating : sellerRatingPaged) {
            RatingResponse ratingResponse = new RatingResponse(sellerRating);
            sellerRatings.add(ratingResponse);
        }

        return new PagedResponse<>(sellerRatings, sellerRatingPaged.getNumber(),
                sellerRatingPaged.getSize(), sellerRatingPaged.getTotalElements(),
                sellerRatingPaged.getTotalPages(), sellerRatingPaged.isLast());
    }

    public PagedResponse<RatingResponse> getRatings(Long userId, int page, int size) {
        validatePageParametersService.validate(page, size);

        Page<SellerRating> sellerRatingPaged = sellerRatingRepository.findBySellerId(userId, PageRequest.of(page,size));
        return createPagedResponse(sellerRatingPaged);
    }
}
