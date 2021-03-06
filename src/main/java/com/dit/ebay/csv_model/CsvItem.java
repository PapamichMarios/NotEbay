package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class CsvItem {
    // which user created (role = SELLER)
    @CsvBindByName(column = "username")
    private String username;

    @CsvBindByName(column = "name")
    private String name;

    @CsvBindByName(column = "description")
    private String description;

    @CsvBindByName(column = "buy_price")
    private BigDecimal buyPrice;

    @CsvBindByName(column = "first_bid")
    private BigDecimal firstBid;

    @CsvBindByName(column = "time_ends")
    private Timestamp timeEnds;

    @CsvBindByName(column = "country")
    private String country;

    @CsvBindByName(column = "geo_lat")
    private BigDecimal geoLat;

    @CsvBindByName(column = "geo_long")
    private BigDecimal geoLong;

    @CsvBindByName(column = "location")
    private String location;

    @CsvBindByName(column = "image_path")
    private String imagePath;

    @CsvBindByName(column = "active")
    private boolean active;

    @CsvBindByName(column = "categoryId")
    private Long categoryId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
