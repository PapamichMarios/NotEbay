package com.dit.ebay.model;

import com.dit.ebay.csv_model.CsvRating;
import com.dit.ebay.request.RatingRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "seller_ratings", schema = "ted_db")
public class SellerRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User userSeller;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bidder_id", nullable = false)
    private User userBidder;

    @Column(name = "rating", nullable = false)
    private byte rating; // 1,2,3,4,5

    @Column(name = "comment")
    private String comment;

    @CreatedDate
    @Column(name = "rate_date")
    private Timestamp rateDate;

    public SellerRating(byte rating, String comment) {
        this.rating = rating;
        this.comment = comment;
    }

    public SellerRating(){

    }

    public SellerRating(RatingRequest ratingRequest) {
        this.rating = ratingRequest.getRating();
        this.comment = ratingRequest.getComment();
    }

    public SellerRating(CsvRating csvRating) {
        this.rating = csvRating.getRating();
        this.comment = csvRating.getComment();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte getRating() {
        return rating;
    }

    public void setRating(byte rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Timestamp getRateDate() {
        return rateDate;
    }

    public void setRateDate(Timestamp rateDate) {
        this.rateDate = rateDate;
    }

    public User getUserBidder() {
        return userBidder;
    }

    public void setUserBidder(User userBidder) {
        this.userBidder = userBidder;
    }

    public User getUserSeller() {
        return userSeller;
    }

    public void setUserSeller(User userSeller) {
        this.userSeller = userSeller;
    }
}
