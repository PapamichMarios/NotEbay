package com.dit.ebay.xml_model;

import com.dit.ebay.xml_model.xml_adapters.XMLRatingAdapter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

@XmlRootElement(name = "Bidder")
@XmlAccessorType(XmlAccessType.FIELD)
public class XMLBidder {

    @XmlAttribute(name = "Rating")
    @XmlJavaTypeAdapter(XMLRatingAdapter.class)
    private Double rating;

    @XmlAttribute(name = "UserID")
    private String username;

    @XmlElement(name = "Location")
    private String location;

    @XmlElement(name = "Country")
    private String country;

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
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

    /*
    public XMLBidder() {
        this.rating = 3.0;
        this.bidderUsername = "bidderUsername";
        this.location = "bidder location";
        this.country = "bidder coutnry";
    }
    */

    @Override
    public String toString() {
        return "XMLBidder{" +
                "rating='" + rating + '\'' +
                ", bidderUsername='" + username + '\'' +
                ", location='" + location + '\'' +
                ", country='" + country + '\'' +
                "}\n";
    }
}
