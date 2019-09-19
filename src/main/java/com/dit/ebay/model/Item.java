package com.dit.ebay.model;

import com.dit.ebay.csv_model.CsvItem;
import com.dit.ebay.request.ItemRequest;
import com.dit.ebay.xml_model.XmlItem;
import com.dit.ebay.xml_model.XmlItemLocation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
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
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "item", cascade = CascadeType.ALL)
    //@JoinColumn(name = "seller_id", nullable=false)
    private Set<Bid> bids = new HashSet<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "item", cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    /*
     * User, owns item
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable=false)
    private User user;

    /*
     * Has 1 fk on the best bid
     */
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "best_bid_id")
    private Bid bestBid; // may be null

    /*
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "item")
    private SellerRating sellerRating;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "item")
    private BidderRating bidderRating;
    */

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "buy_price", precision = 19, scale = 4)
    private BigDecimal buyPrice;

    @Column(name = "first_bid", precision = 19, scale = 4)
    private BigDecimal firstBid;

    @Column(name = "num_of_bids")
    private int numOfBids;

    //@CreatedDate
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

    @Column(name = "active")
    private boolean active;

    public Item() {

    }

    @PrePersist
    public void checkDatesPrePersist() {
        if (timeStarted != null) return;
        timeStarted = new Timestamp(System.currentTimeMillis());
        timeStarted.setNanos(0); // don't count millis
    }

    /*
     * Insert from csv
     */
    public Item(CsvItem csvItem) {
        this.name = csvItem.getName();
        this.description = csvItem.getDescription();
        this.timeEnds = csvItem.getTimeEnds();
        this.buyPrice = csvItem.getBuyPrice();  // may be null
        this.firstBid = csvItem.getFirstBid();  // can't be null
        this.numOfBids = 0;
        this.country = csvItem.getCountry();
        this.location = csvItem.getLocation();
        //this.imagePath = csvItem.getImagePath(); // TODO : Download on file system store hashed location of imageP
        this.geoLat = csvItem.getGeoLat();
        this.geoLong = csvItem.getGeoLong();
        this.active = csvItem.isActive();
    }

    /*
     * Insert from request
     */
    public Item(ItemRequest itemRequest) {
        this.name = itemRequest.getName();
        this.description = itemRequest.getDescription();
        this.timeEnds = itemRequest.getTimeEnds();
        this.buyPrice = itemRequest.getBuyPrice();  // may be null (means 0)
        this.firstBid = itemRequest.getFirstBid();  // can't be null
        this.numOfBids = 0;
        this.country = itemRequest.getCountry();
        this.location = itemRequest.getLocation();
        //this.imagePath = itemRequest.getImagePath(); // TODO : Download on file system store hashed location of imageP
        // avoid null pointer ex
        if (itemRequest.getJgp() != null) {
            this.geoLat = itemRequest.getJgp().getGeoLat();
            this.geoLong = itemRequest.getJgp().getGeoLong();
        }
        this.active = itemRequest.isActive();
    }

    public Item(XmlItem xmlItem) {
        this.name = xmlItem.getName();
        this.firstBid = xmlItem.getFirstBid();
        this.buyPrice = xmlItem.getBuyPrice(); // default
        this.numOfBids = xmlItem.getNumOfBids();
        this.timeStarted = xmlItem.getTimeStarted();
        this.timeEnds = xmlItem.getTimeEnds();
        this.description = xmlItem.getDescription();

        XmlItemLocation xmlItemLocation = xmlItem.getLocation();
        if (xmlItemLocation != null) {
            this.geoLat = xmlItemLocation.getLat(); // maybe be null
            this.geoLong = xmlItemLocation.getLng(); // maybe be null
            this.location = xmlItemLocation.getLocation();
        }
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

    public Set<Bid> getBids() {
        return bids;
    }

    public void setBids(Set<Bid> bids) {
        this.bids = bids;
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

    public String getDescription() { return description; }

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
     * Checks from request which fields aren't blank to change them
     */
    public void updateItemFields(ItemRequest itemRequest) {
        //if (itemRequest.getName() != null) {
            this.name = itemRequest.getName();
        //}

        // TODO : add date checking
        //if (itemRequest.getTimeEnds() != null) {
            this.timeEnds = itemRequest.getTimeEnds();
        //}

        //if (itemRequest.getDescription() != null) {
            this.description = itemRequest.getDescription();
        //}

        //if (itemRequest.getFirstBid() != null) {
            this.firstBid = itemRequest.getFirstBid();
        //}

        //if (itemRequest.getBuyPrice() != null) {
            this.buyPrice = itemRequest.getBuyPrice();
        //}

        //if (itemRequest.getCountry() != null) {
            this.country = itemRequest.getCountry();
        //}

        //if (itemRequest.getLocation() != null) {
            this.location = itemRequest.getLocation();
        //}

        //if (itemRequest.getJgp() != null) {
            this.geoLat = itemRequest.getJgp().getGeoLat();
            this.geoLong = itemRequest.getJgp().getGeoLong();
        //}

        this.active = itemRequest.isActive();
    }

    public Bid getBestBid() {
        return bestBid;
    }

    public void setBestBid(Bid bestBid) {
        this.bestBid = bestBid;
    }

    public void increaseNumOfBids() { this.numOfBids++; }

    public void updateTimeEnds() {
        // check dates
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        currentTime.setNanos(0); // don't count millis
        this.timeEnds = currentTime;
    }

    public boolean itemIsFinished() {
        // check dates
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        currentTime.setNanos(0); // don't count millis
        return currentTime.after(this.timeEnds);
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
