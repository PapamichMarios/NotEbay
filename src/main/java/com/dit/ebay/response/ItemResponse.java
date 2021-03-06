package com.dit.ebay.response;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.core.io.Resource;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class ItemResponse {

    protected Long id;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    protected List<Category> categories = new ArrayList<>(); // maybe be null

    protected String name;

    protected String description;

    protected BigDecimal buyPrice;

    protected BigDecimal firstBid;

    protected int numOfBids;

    protected Timestamp timeStarted;

    protected Timestamp timeEnds;

    protected String country;

    protected BigDecimal geoLat;

    protected BigDecimal geoLong;

    protected String location;

    //protected String imagePath;

    protected boolean active;

    protected Bid bestBid; // may be null

    protected BigDecimal rating; //aggregated may be null

    protected Long reputation;

    protected boolean finished;

    protected List<Long> images;

    protected Long imageId;

    public ItemResponse() {

    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public ItemResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        //this.categories = item.getCategories();
        this.description = item.getDescription();
        this.timeStarted = item.getTimeStarted();
        this.timeEnds = item.getTimeEnds();
        this.buyPrice = item.getBuyPrice();  // may be null
        this.firstBid = item.getFirstBid();  // can't be null
        this.numOfBids = item.getNumOfBids();
        this.country = item.getCountry();
        this.location = item.getLocation();
        //this.imagePath = item.getImagePath(); // TODO : Download on file system store hashed location of imageP
        this.geoLat = item.getGeoLat();
        this.geoLong = item.getGeoLong();
        this.active = item.isActive();
        this.bestBid = item.getBestBid(); // maybe null
    }

    public List<Long> getImages() {
        return images;
    }

    public void setImages(List<Long> images) {
        this.images = images;
    }

    public Long getReputation() {
        return reputation;
    }

    public void setReputation(Long reputation) {
        this.reputation = reputation;
    }

    public List<Category> getCategories() { return categories; }

    public void setCategories(List<Category> categories) { this.categories = categories; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public BigDecimal getGeoLat() {
        return geoLat;
    }

    public void setGeoLat(BigDecimal geoLat) {
        this.geoLat = geoLat;
    }

    public BigDecimal getGeoLong() {
        return geoLong;
    }

    public void setGeoLong(BigDecimal geoLong) {
        this.geoLong = geoLong;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bid getBestBid() {
        return bestBid;
    }

    public void setBestBid(Bid bestBid) {
        this.bestBid = bestBid;
    }


    public BigDecimal getRating() { return rating; }

    public void setRating(BigDecimal rating) { this.rating = rating; }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }
}
