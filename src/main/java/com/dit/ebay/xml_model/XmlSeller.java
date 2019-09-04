package com.dit.ebay.xml_model;

import com.dit.ebay.xml_model.xml_adapters.XmlRatingAdapter;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

//@XmlRootElement(name = "Seller")
@XmlAccessorType(XmlAccessType.FIELD)
public class XmlSeller {

    @XmlAttribute(name = "Rating")
    @XmlJavaTypeAdapter(XmlRatingAdapter.class)
    private Long rating;

    @XmlAttribute(name = "UserID")
    private String username;

    public XmlSeller() {
    }

    public XmlSeller(String username, Long rating) {
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
        return "XmlSeller{" +
                "rating='" + rating + '\'' +
                ", userId='" + username + '\'' +
                "}\n";
    }
}
