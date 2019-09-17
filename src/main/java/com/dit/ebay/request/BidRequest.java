package com.dit.ebay.request;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.MathContext;

public class BidRequest {


    private String bidAmountStr;

    private BigDecimal bidAmount;

    public String getBidAmountStr() {
        return bidAmountStr;
    }

    public void setBidAmountStr(String bidAmountStr) {
        this.bidAmountStr = bidAmountStr;
    }

    public BigDecimal getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(BigDecimal bidAmount) {
        this.bidAmount = bidAmount;
    }

    public void transformStrToBigDecimal() {
        if (bidAmountStr == null || bidAmountStr.isEmpty()) this.bidAmount = null;
        this.bidAmount = new BigDecimal(bidAmountStr).setScale(4);
    }
}
