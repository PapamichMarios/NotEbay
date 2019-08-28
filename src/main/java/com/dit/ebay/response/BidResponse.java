package com.dit.ebay.response;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Timestamp;

public class BidResponse {
    private Long id;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    private double bidAmount;

    private Timestamp bidTime;

    private boolean accepted;

    public BidResponse(Bid bid) {
        this.id = bid.getId();
        this.user = bid.getUser();
        this.bidAmount = bid.getBidAmount();
        this.bidTime = bid.getBidTime();
        this.accepted  = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
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
}
