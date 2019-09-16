package com.dit.ebay.response;

import com.dit.ebay.model.BidderRating;
import com.dit.ebay.model.SellerRating;
import com.dit.ebay.request.RatingRequest;

import java.math.BigDecimal;

public class RatingResponse {

    private Long userId;

    private String username;

    private Long itemId;

    private String itemName;

    private Byte rating;

    public RatingResponse(Long userId, String username, Long itemId, String itemName, Byte rating) {
        this.userId = userId;
        this.username = username;
        this.itemId = itemId;
        this.itemName = itemName;
        this.rating = rating;
    }

    public RatingResponse(BidderRating bidderRating) {
        this.userId = bidderRating.getUserSeller().getId();
        this.username = bidderRating.getUserSeller().getUsername();
        this.itemId = bidderRating.getItem().getId();
        this.itemName = bidderRating.getItem().getName();
        this.rating = bidderRating.getRating();
    }

    public RatingResponse(SellerRating sellerRating) {
        this.userId = sellerRating.getUserSeller().getId();
        this.username = sellerRating.getUserSeller().getUsername();
        this.itemId = sellerRating.getItem().getId();
        this.itemName = sellerRating.getItem().getName();
        this.rating = sellerRating.getRating();
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Byte getRating() {
        return rating;
    }

    public void setRating(Byte rating) {
        this.rating = rating;
    }
}
