package com.dit.ebay.model;

import com.dit.ebay.csv_model.CSVBid;
import com.dit.ebay.exception.AppException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "bids", schema = "ted_db")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bidder_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "bid_amount")
    private double bidAmount;

    @CreatedDate
    @Column(name = "bid_time")
    private Timestamp bidTime;

    @Column(name = "accepted")
    private boolean accepted;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "bestBid")
    private Item itemBestBid;

    // Database trigger to check dates
    // TODO : have to change it in the future
    @PrePersist
    public void checkDatesPrePersist() {
        this.bidTime = new Timestamp(System.currentTimeMillis());
        this.bidTime.setNanos(0); // don't count millis
        if (this.bidTime.after(item.getTimeEnds())) {
            throw new AppException("Sorry, You can't bid on Item which bid time has ended.");
        }
    }

    public Bid() {
    }

    /*
     * Insert from csv
     */

    public Bid(CSVBid csvBid) {
        this.bidAmount = csvBid.getBidAmount();
        this.accepted = csvBid.isAccepted();
    }

    public Bid(double bidAmount) {
        this.bidAmount = bidAmount;
        this.accepted = false; // waiting from the SELLER to accept the bid
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public User getUserBidder() {
        return user;
    }

    public void setUserBidder(User userBidder) {
        this.user = userBidder;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Timestamp getBidTime() { return bidTime; }

    public void setBidTime(Timestamp bidTime) { this.bidTime = bidTime; }

    public void setUser(User user) { this.user = user; }

    public User getUser() { return user; }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public boolean isAccepted() { return accepted; }

    public void setAccepted(boolean accepted) { this.accepted = accepted; }

    public Item getItemBestBid() {
        return itemBestBid;
    }

    public void setItemBestBid(Item itemBestBid) {
        this.itemBestBid = itemBestBid;
    }
}
