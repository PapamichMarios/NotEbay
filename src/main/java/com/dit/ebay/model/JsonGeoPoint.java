package com.dit.ebay.model;

import java.math.BigDecimal;

/*
 * Use this calss to create a point
 */
public class JsonGeoPoint {

    private BigDecimal geoLat;
    private BigDecimal geoLong;

    public JsonGeoPoint(BigDecimal geoLat, BigDecimal geoLong) {
        this.geoLat = geoLat;
        this.geoLong = geoLong;
    }

    public JsonGeoPoint() {

    }

    public BigDecimal getGeoLat() {
        return geoLat;
    }

    public void setGeoLat(BigDecimal geoLat) {
        this.geoLat = geoLat;
    }

    public BigDecimal getGeoLong() {
        return geoLong;
    }

    public void setGeoLong(BigDecimal geoLong) {
        this.geoLong = geoLong;
    }
}
