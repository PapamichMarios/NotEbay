package com.dit.ebay.response;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class BidResponse {
    private Long bidId;

    private Long itemId;

    private String itemName;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    private BigDecimal bidAmount;

    private Timestamp bidTime;

    private boolean accepted;

    public BidResponse(Bid bid) {
        this.bidId = bid.getId();
        this.user = bid.getUser();
        this.bidAmount = bid.getBidAmount();
        this.bidTime = bid.getBidTime();
        this.accepted  = true;
        this.itemId = bid.getItem().getId();
        this.itemName = bid.getItem().getName();
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Timestamp getBidTime() {
        return bidTime;
    }

    public void setBidTime(Timestamp bidTime) {
        this.bidTime = bidTime;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public Long getBidId() {
        return bidId;
    }

    public void setBidId(Long bidId) {
        this.bidId = bidId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public BigDecimal getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(BigDecimal bidAmount) {
        this.bidAmount = bidAmount;
    }
}
