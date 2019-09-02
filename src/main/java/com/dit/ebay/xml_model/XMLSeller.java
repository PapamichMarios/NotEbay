package com.dit.ebay.xml_model;

import com.dit.ebay.xml_model.xml_adapters.XMLRatingAdapter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

@XmlRootElement(name = "Seller")
@XmlAccessorType(XmlAccessType.FIELD)
public class XMLSeller {

    @XmlAttribute(name = "Rating")
    @XmlJavaTypeAdapter(XMLRatingAdapter.class)
    private Double rating;

    @XmlAttribute(name = "UserID")
    private String username;

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) {
        this.username = username;
    }

    /*
    public XMLSeller() {
        this.itemId = "itemId-1";
        this.userId = "userId-1";
    }
    */

    @Override
    public String toString() {
        return "XMLSeller{" +
                "rating='" + rating + '\'' +
                ", userId='" + username + '\'' +
                "}\n";
    }
}
