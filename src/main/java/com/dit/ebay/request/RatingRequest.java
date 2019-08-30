package com.dit.ebay.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/*
 * Use this class for both seller rating and bidder rating
 */
public class RatingRequest {

    @Min(value = 1, message = "Rating must be equal/greater of 1")
    @Max(value = 5, message = "Rating's max value is 5")
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
