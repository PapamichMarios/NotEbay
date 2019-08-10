package com.dit.ebay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.geo.Point;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
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

    @JsonIgnore // maybe change it later
    @Column(name = "geo_location", columnDefinition = "Point")
    private Point geoLocation;

    @Column(name = "location")
    private String location;

    @JsonIgnore
    @Column(name = "image_path")
    private String imagePath;

    public Item() {

    }

    public Item(String name, String description, Timestamp timeEnds,
                double buyPrice, double firstBid, String country,
                Point geoLocation, String location, String imagePath) {
        this.name = name;
        this.description = description;
        this.timeEnds = timeEnds;
        this.currBestBid = firstBid;  // when bid starts this equals to first bid
        this.buyPrice = buyPrice;  // may be null
        this.firstBid = firstBid;  // can't be null
        this.numOfBids = 0;
        this.country = country;
        this.geoLocation = geoLocation;
        this.location = location;
        this.imagePath = imagePath;
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

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
