package com.dit.ebay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

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

    public Bid() {

    }

    public Bid(double bidAmount) {
        this.bidAmount = bidAmount;
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
}
