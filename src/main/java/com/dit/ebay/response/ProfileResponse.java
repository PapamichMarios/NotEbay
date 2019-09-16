package com.dit.ebay.response;

import com.dit.ebay.model.User;

import java.math.BigDecimal;

public class ProfileResponse {

    private User user;

    private Long reputationSeller;
    private BigDecimal avgSellerRating;

    private Long reputationBidder;
    private BigDecimal avgBidderRating;

    public ProfileResponse(User user, Long reputationSeller, BigDecimal avgSellerRating,
                           Long reputationBidder, BigDecimal avgBidderRating) {
        this.user = user;
        this.reputationSeller = reputationSeller;
        this.avgSellerRating = avgSellerRating;
        this.reputationBidder = reputationBidder;
        this.avgBidderRating = avgBidderRating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getReputationSeller() {
        return reputationSeller;
    }

    public void setReputationSeller(Long reputationSeller) {
        this.reputationSeller = reputationSeller;
    }

    public BigDecimal getAvgSellerRating() {
        return avgSellerRating;
    }

    public void setAvgSellerRating(BigDecimal avgSellerRating) {
        this.avgSellerRating = avgSellerRating;
    }

    public Long getReputationBidder() {
        return reputationBidder;
    }

    public void setReputationBidder(Long reputationBidder) {
        this.reputationBidder = reputationBidder;
    }

    public BigDecimal getAvgBidderRating() {
        return avgBidderRating;
    }

    public void setAvgBidderRating(BigDecimal avgBidderRating) {
        this.avgBidderRating = avgBidderRating;
    }
}
