package com.dit.ebay.json_model;

import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonBidder {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonProperty("Rating")
    private Long rating;

    @JsonProperty("UserID")
    private String username;

    @JsonProperty("Location")
    private String location;

    @JsonProperty("Country")
    private String country;

    public JsonBidder() {
    }


    public JsonBidder(User bidder, Long rating) {
        this.rating = rating;
        this.username = bidder.getUsername();
        this.location = bidder.getCity();
        this.country = bidder.getCountry();
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "JsonBidder{" +
                "rating='" + rating + '\'' +
                ", bidderUsername='" + username + '\'' +
                ", location='" + location + '\'' +
                ", country='" + country + '\'' +
                "}\n";
    }
}