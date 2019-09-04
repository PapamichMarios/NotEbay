package com.dit.ebay.json_model;

import com.dit.ebay.json_model.json_serializers.JsonDollarSerializer;
import com.dit.ebay.model.Item;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class JsonItem {

    @JsonProperty("ItemID")
    private String itemId;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Category")
    private List<String> category = null;

    @JsonProperty("Currently")
    @JsonSerialize(using = JsonDollarSerializer.class)
    private BigDecimal currently;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("Buy_Price")
    @JsonSerialize(using = JsonDollarSerializer.class)
    private BigDecimal buyPrice;

    @JsonProperty("First_Bid")
    @JsonSerialize(using = JsonDollarSerializer.class)
    private BigDecimal firstBid;

    @JsonProperty("Number_of_Bids")
    private int numOfBids;

    @JsonProperty("Bids")
    private List<JsonBid> bids = new ArrayList<>();

    @JsonProperty("Location")
    private JsonItemLocation location;

    @JsonProperty("Country")
    private String country;

    @JsonProperty("Started")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMM-dd-yy HH:mm:ss")
    private Timestamp timeStarted;

    @JsonProperty("Ends")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MMM-dd-yy HH:mm:ss")
    private Timestamp timeEnds;

    @JsonProperty("Seller")
    private JsonSeller seller;

    @JsonProperty("Description")
    private String description;

    public JsonItem() {

    }

    public JsonItem(Item item) {
        this.itemId = item.getId().toString();
        this.name = item.getName();
        this.firstBid = item.getFirstBid();
        this.buyPrice = item.getBuyPrice();
        this.currently = item.getBestBid() != null ? item.getBestBid().getBidAmount() : firstBid;
        this.timeStarted = item.getTimeStarted();
        this.timeEnds = item.getTimeEnds();
        this.description = item.getDescription();
        this.country = item.getCountry();
        this.location = new JsonItemLocation(item.getLocation(), item.getGeoLat(), item.getGeoLong());
        this.numOfBids = item.getNumOfBids();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public BigDecimal getCurrently() {
        return currently;
    }

    public void setCurrently(BigDecimal currently) {
        this.currently = currently;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(BigDecimal buyPrice) {
        this.buyPrice = buyPrice;
    }

    public BigDecimal getFirstBid() {
        return firstBid;
    }

    public void setFirstBid(BigDecimal firstBid) {
        this.firstBid = firstBid;
    }

    public int getNumOfBids() {
        return numOfBids;
    }

    public void setNumOfBids(int numOfBids) {
        this.numOfBids = numOfBids;
    }

    public List<JsonBid> getBids() {
        return bids;
    }

    public void setBids(List<JsonBid> bids) {
        this.bids = bids;
    }

    public JsonItemLocation getLocation() {
        return location;
    }

    public void setLocation(JsonItemLocation location) {
        this.location = location;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Timestamp getTimeStarted() {
        return timeStarted;
    }

    public void setTimeStarted(Timestamp timeStarted) {
        this.timeStarted = timeStarted;
    }

    public Timestamp getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(Timestamp timeEnds) {
        this.timeEnds = timeEnds;
    }

    public JsonSeller getSeller() {
        return seller;
    }

    public void setSeller(JsonSeller seller) {
        this.seller = seller;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void addBid(JsonBid JsonBid) {
        this.bids.add(JsonBid);
    }

    @Override
    public String toString() {
        return "JsonItem{" +
                "itemId='" + itemId + '\'' + "\n" +
                ", name='" + name + '\'' + "\n" +
                ", category=" + category + "\n" +
                ", currently=" + currently + "\n" +
                ", firstBid=" + firstBid + "\n" +
                ", numOfBids=" + numOfBids  + "\n" +
                ", bids=" + bids +
                ", location=" + location  + "\n" +
                ", country='" + country + '\''  + "\n" +
                ", timeStarted=" + timeStarted  + "\n" +
                ", timeEnds=" + timeEnds  + "\n" +
                ", seller=" + seller  + "\n" +
                ", description='" + description + '\'' +
                "}\n";
    }

}