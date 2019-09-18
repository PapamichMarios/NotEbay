package com.dit.ebay.request;

import com.dit.ebay.util.JsonGeoPoint;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.commons.collections.list.AbstractListDecorator;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
public class ItemRequest {

    private String name;

    private String description;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp timeEnds;

    // Minimum first bid, determined by the seller
    private BigDecimal firstBid;

    // Buy item directly
    private BigDecimal buyPrice;

    private String country;

    private String location;

    private JsonGeoPoint jgp;

    private boolean active;

    private Long lastCategoryId;

    //private List<MultipartFile> images = new ArrayList<>();

    public BigDecimal getFirstBid() {
        return firstBid;
    }

    public void setFirstBid(BigDecimal firstBid) {
        this.firstBid = firstBid;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(BigDecimal buyPrice) {
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

    public Long getLastCategoryId() {
        return lastCategoryId;
    }

    public void setLastCategoryId(Long lastCategoryId) {
        this.lastCategoryId = lastCategoryId;
    }
    /*
    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
    */

    @Override
    public String toString() {
        return "ItemRequest{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", timeEnds=" + timeEnds +
                ", firstBid=" + firstBid +
                ", buyPrice=" + buyPrice +
                ", country='" + country + '\'' +
                ", location='" + location + '\'' +
                ", jgp=" + jgp +
                ", active=" + active +
                ", lastCategoryId=" + lastCategoryId +
                '}';
    }
}

