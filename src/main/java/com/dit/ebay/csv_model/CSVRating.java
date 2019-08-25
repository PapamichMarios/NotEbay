package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class CSVRating {
    @CsvBindByName(column = "sellerUsername")
    private String sellerUsername;

    @CsvBindByName(column = "bidderUsername")
    private String bidderUsername;

    @Min(1)
    @Max(5)
    @CsvBindByName(column = "rating")
    private byte rating;  // 1,2,3,4,5

    @CsvBindByName(column = "comment")
    private String comment;

    public CSVRating() {

    }

    public String getSellerUsername() {
        return sellerUsername;
    }

    public void setSellerUsername(String sellerUsername) {
        this.sellerUsername = sellerUsername;
    }

    public String getBidderUsername() {
        return bidderUsername;
    }

    public void setBidderUsername(String bidderUsername) {
        this.bidderUsername = bidderUsername;
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
