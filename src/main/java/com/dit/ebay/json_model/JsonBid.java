package com.dit.ebay.json_model;

import com.dit.ebay.json_model.json_serializers.JsonDollarSerializer;
import com.dit.ebay.model.Bid;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.sql.Timestamp;
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.WRAPPER_OBJECT
)
@JsonSubTypes({
        @JsonSubTypes.Type(name = "Bid", value = JsonBid.class)
})
public class JsonBid {

    @JsonProperty("Bidder")
    private JsonBidder bidder;

    @JsonProperty("Time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMM-dd-yy HH:mm:ss")
    private Timestamp bidDate;

    @JsonProperty("Amount")
    @JsonSerialize(using = JsonDollarSerializer.class)
    private BigDecimal bidAmount;

    public JsonBid() {

    }

    public JsonBid(Bid bid) {
        this.bidDate = bid.getBidTime();
        this.bidAmount = bid.getBidAmount();
    }

    public JsonBidder getBidder() {
        return bidder;
    }

    public void setBidder(JsonBidder bidder) {
        this.bidder = bidder;
    }

    public Timestamp getBidDate() {
        return bidDate;
    }

    public void setBidDate(Timestamp bidDate) {
        this.bidDate = bidDate;
    }

    public BigDecimal getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(BigDecimal bidAmount) {
        this.bidAmount = bidAmount;
    }

    @Override
    public String toString() {
        return "JsonBid{" +
                "bidder=" + bidder +
                ", bidDate=" + bidDate +
                ", bidAmmount=" + bidAmount +
                "}\n";
    }
}