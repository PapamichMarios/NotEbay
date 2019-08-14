package com.dit.ebay.request;

import javax.validation.constraints.NotNull;

public class BidRequest {

    private double bidAmount;

    public void setBidAmount(double bidAmount) { this.bidAmount = bidAmount; }

    public double getBidAmount() { return bidAmount; }
}
