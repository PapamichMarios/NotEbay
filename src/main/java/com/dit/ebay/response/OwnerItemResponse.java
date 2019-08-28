package com.dit.ebay.response;

import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class OwnerItemResponse extends ItemResponse {
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User bestBidder;

    public OwnerItemResponse(Item item) {
        super(item);
        this.bestBidder = this.bestBid != null ? item.getBestBid().getUser() : null;
    }

    public OwnerItemResponse() {

    }

    public User getBestBidder() {
        return bestBidder;
    }

    public void setBestBidder(User bestBidder) {
        this.bestBidder = bestBidder;
    }
}
