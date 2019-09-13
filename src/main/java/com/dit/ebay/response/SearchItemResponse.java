package com.dit.ebay.response;

import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class SearchItemResponse extends ItemResponse {
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User owner;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User bestBidder;

    public SearchItemResponse(User owner, User bestBidder) {
        this.owner = owner;
        this.bestBidder = bestBidder;
    }

    public SearchItemResponse(Item item, User owner, User bestBidder) {
        super(item);
        this.owner = owner;
        this.bestBidder = bestBidder;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getBestBidder() {
        return bestBidder;
    }

    public void setBestBidder(User bestBidder) {
        this.bestBidder = bestBidder;
    }
}
