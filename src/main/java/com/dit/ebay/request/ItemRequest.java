package com.dit.ebay.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.geo.Point;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

public class ItemRequest {

    @NotNull
    private String name;

    private String description;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp timeEnds;

    // Minimum first bid, determined by the selle   r
    @NotNull
    private double firstBid;

    // Buy item directly
    private double buyPrice;

    private String country;

    private Point geoLocation;

    private String location;

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

    public Point getGeoLocation() {
        return geoLocation;
    }

    public void setGeoLocation(Point geoLocation) {
        this.geoLocation = geoLocation;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}

