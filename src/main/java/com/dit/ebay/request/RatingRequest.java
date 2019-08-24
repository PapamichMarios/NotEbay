package com.dit.ebay.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/*
 * Use this class for both seller rating and bidder rating
 */
public class RatingRequest {

    @NotNull
    @Min(1)
    @Max(5)
    private byte rating;  // 1,2,3,4,5

    private String comment;

    public RatingRequest() {

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

}
