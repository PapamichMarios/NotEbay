package com.dit.ebay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
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

    @Column(name = "curr_best_bid")
    private double currBestBid;

    @Column(name = "buy_price")
    private double buyPrice;

    @Column(name = "first_bid")
    private double firstBid;

    @Column(name = "num_of_bids")
    private int numOfBids;

    public Item() {

    }

    public Item(double currBestBid, double buyPrice, double firstBid, int numOfBids) {
        this.currBestBid = currBestBid;
        this.buyPrice = buyPrice;
        this.firstBid = firstBid;
        this.numOfBids = numOfBids;
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
}
