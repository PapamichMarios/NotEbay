package com.dit.ebay.response;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class SearchResponse {
    private Long id;

    private String name;

    private BigDecimal buyPrice;

    private BigDecimal firstBid;

    private int numOfBids;

    private Timestamp timeEnds;

    private String country;
    
    private String location;

    private String imagePath;

    private boolean active;

    private Bid bestBid; // may be null

    private Long sellerId;

    private String sellerName;

    private BigDecimal rating;

    private Long reputation;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Category> categories = new ArrayList<>();

    public SearchResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.buyPrice = item.getBuyPrice();
        this.firstBid = item.getFirstBid();
        this.numOfBids = item.getNumOfBids();
        this.timeEnds = item.getTimeEnds();
        this.country = item.getCountry();
        this.location = item.getLocation();
        this.imagePath = item.getImagePath();
        this.active = item.isActive();
        this.bestBid = item.getBestBid();
        this.sellerName = item.getUser().getUsername();
        this.sellerId = item.getUser().getId();
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Long getReputation() {
        return reputation;
    }

    public void setReputation(Long reputation) {
        this.reputation = reputation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Timestamp getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(Timestamp timeEnds) {
        this.timeEnds = timeEnds;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Bid getBestBid() {
        return bestBid;
    }

    public void setBestBid(Bid bestBid) {
        this.bestBid = bestBid;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
