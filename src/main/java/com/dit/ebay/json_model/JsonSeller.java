package com.dit.ebay.json_model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonSeller {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonProperty("Rating")
    private Long rating;

    @JsonProperty("UserID")
    private String username;

    public JsonSeller() {
    }

    public JsonSeller(String username, Long rating) {
        this.rating = rating;
        this.username = username;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "JsonSeller{" +
                "rating='" + rating + '\'' +
                ", userId='" + username + '\'' +
                "}\n";
    }
}