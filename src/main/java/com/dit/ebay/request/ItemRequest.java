package com.dit.ebay.request;

import com.dit.ebay.util.JsonGeoPoint;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Timestamp;

public class ItemRequest {

    private String name;

    private String description;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp timeEnds;

    // Minimum first bid, determined by the seller
    private double firstBid;

    // Buy item directly
    private double buyPrice;

    private String country;

    private String location;

    private String imagePath;

    private JsonGeoPoint jgp;

    private boolean active;

    public double getFirstBid() {
        return firstBid;
    }

    public void setFirstBid(double firstBid) {
        this.firstBid = firstBid;
    }

    public double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(Timestamp timeEnds) {
        this.timeEnds = timeEnds;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public JsonGeoPoint getJgp() { return jgp; }

    public void setJgp(JsonGeoPoint jgp) { this.jgp = jgp; }

    public boolean isActive() { return active; }

    public void setActive(boolean active) { this.active = active; }

    public String getImagePath() { return imagePath; }

    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}

