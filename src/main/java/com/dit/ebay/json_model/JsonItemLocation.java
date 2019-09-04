package com.dit.ebay.json_model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class JsonItemLocation {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonProperty("Latitude")
    private BigDecimal lat;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonProperty("Longitude")
    private BigDecimal lng;

    @JsonProperty("Location")
    private String location;

    public JsonItemLocation() {

    }

    public JsonItemLocation(String location, BigDecimal lat, BigDecimal lng) {
        this.lat = lat;
        this.lng = lng;
        this.location = location;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public BigDecimal getLng() {
        return lng;
    }

    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    @Override
    public String toString() {
        return "XmlItemLocation{" +
                "lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", location='" + location + '\'' +
                "}\n";
    }
}

