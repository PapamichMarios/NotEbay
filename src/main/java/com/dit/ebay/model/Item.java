package com.dit.ebay.model;

import com.dit.ebay.request.ItemRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.geo.Point;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "items", schema = "ted_db")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /*
     * Only for users with role : BIDDER (Bids)
     */
    @JsonIgnore
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    //@JoinColumn(name = "seller_id", nullable=false)
    private Set<Bid> bids = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Category> categories;

    /*
     * User, owns item
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable=false)
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "curr_best_bid")
    private double currBestBid;

    @Column(name = "buy_price")
    private double buyPrice;

    @Column(name = "first_bid")
    private double firstBid;

    @Column(name = "num_of_bids")
    private int numOfBids;

    @CreatedDate
    @Column(name = "time_started")
    private Timestamp timeStarted;

    @Column(name = "time_ends")
    private Timestamp timeEnds;

    @Column(name = "country")
    private String country;

    @Column(name = "geo_lat",  precision = 10, scale = 6)
    private BigDecimal geoLat;

    @Column(name = "geo_long",  precision = 10, scale = 6)
    private BigDecimal geoLong;

    @Column(name = "location")
    private String location;

    @JsonIgnore
    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "active")
    private boolean active;

    public Item() {

    }

    public Item(ItemRequest itemRequest) {
        this.name = itemRequest.getName();
        this.description = itemRequest.getDescription();
        this.timeEnds = itemRequest.getTimeEnds();
        this.currBestBid = itemRequest.getFirstBid();  // when bid starts this equals to first bid
        this.buyPrice = itemRequest.getBuyPrice();  // may be null
        this.firstBid = itemRequest.getFirstBid();  // can't be null
        this.numOfBids = 0;
        this.country = itemRequest.getCountry();
        this.location = itemRequest.getLocation();
        this.imagePath = itemRequest.getImagePath(); // TODO : Download on file system store hashed location of imageP
        // avoid null pointer ex
        if (itemRequest.getJgp() != null) {
            this.geoLat = itemRequest.getJgp().getGeoLat();
            this.geoLong = itemRequest.getJgp().getGeoLong();
        }
        this.active = itemRequest.isActive();
    }

    public double getCurrBestBid() {
        return currBestBid;
    }

    public void setCurrBestBid(double currBestBid) {
        this.currBestBid = currBestBid;
    }

    public double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public double getFirstBid() {
        return firstBid;
    }

    public void setFirstBid(double firstBid) {
        this.firstBid = firstBid;
    }

    public int getNumOfBids() {
        return numOfBids;
    }

    public void setNumOfBids(int numOfBids) {
        this.numOfBids = numOfBids;
    }

    public Set<Bid> getBids() {
        return bids;
    }

    public void setBids(Set<Bid> bids) {
        this.bids = bids;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public Long getId() {
        return id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocation() { return location; }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    /*
     * Checks from request which fieleds aren't blanck to change them
     */
    public void updateItemFields(ItemRequest itemRequest) {
        if (itemRequest.getName() != null) {
            this.name = itemRequest.getName();
        }

        if (itemRequest.getTimeEnds() != null) {
            this.timeEnds = itemRequest.getTimeEnds();
        }

        if (itemRequest.getDescription() != null) {
            this.description = itemRequest.getDescription();
        }

        if (itemRequest.getFirstBid() != -1) {
            this.firstBid = itemRequest.getFirstBid();
        }

        if (itemRequest.getBuyPrice() != -1) {
            this.buyPrice = itemRequest.getBuyPrice();
        }

        if (itemRequest.getCountry() != null) {
            this.country = itemRequest.getCountry();
        }

        if (itemRequest.getLocation() != null) {
            this.location = itemRequest.getLocation();
        }

        if (itemRequest.getJgp() != null) {
            this.geoLat = itemRequest.getJgp().getGeoLat();
            this.geoLong = itemRequest.getJgp().getGeoLong();
        }

        this.active = itemRequest.isActive();
    }
}
