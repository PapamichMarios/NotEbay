package com.dit.ebay.response;

import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class BidderItemResponse extends ItemResponse {

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User userSeller;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User bestBidder;

    public BidderItemResponse(Item item) {
        super(item);
        this.userSeller = item.getUser();
        this.bestBidder = this.bestBid != null ? item.getBestBid().getUser() : null;
    }

    public User getUserSeller() {
        return userSeller;
    }

    public void setUserSeller(User userSeller) {
        this.userSeller = userSeller;
    }

    public User getBestBidder() {
        return bestBidder;
    }

    public void setBestBidder(User bestBidder) {
        this.bestBidder = bestBidder;
    }
}
