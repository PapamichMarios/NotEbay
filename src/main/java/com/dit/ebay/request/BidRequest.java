package com.dit.ebay.request;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class BidRequest {

    private BigDecimal bidAmount;

    public void setBidAmount(BigDecimal bidAmount) { this.bidAmount = bidAmount; }

    public BigDecimal getBidAmount() { return bidAmount; }
}
