package com.dit.ebay.xml_model;

import com.dit.ebay.xml_model.xml_adapters.XmlGeospatialAdapter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;

//@XmlRootElement(name = "Location")
@XmlAccessorType(XmlAccessType.FIELD)
public class XmlItemLocation {

    @XmlAttribute(name = "Latitude")
    @XmlJavaTypeAdapter(XmlGeospatialAdapter.class)
    private BigDecimal lat;

    @XmlAttribute(name = "Longitude")
    @XmlJavaTypeAdapter(XmlGeospatialAdapter.class)
    private BigDecimal lng;

    @XmlValue
    private String location;

    public XmlItemLocation() {

    }

    public XmlItemLocation(String location, BigDecimal lat, BigDecimal lng) {
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
