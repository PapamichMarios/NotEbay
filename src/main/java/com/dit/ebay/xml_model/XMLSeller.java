package com.dit.ebay.xml_model;

import com.dit.ebay.model.Bid;
import com.dit.ebay.xml_model.xml_adapters.XMLRatingAdapter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;

@XmlRootElement(name = "Seller")
@XmlAccessorType(XmlAccessType.FIELD)
public class XMLSeller {

    @XmlAttribute(name = "Rating")
    @XmlJavaTypeAdapter(XMLRatingAdapter.class)
    private Long rating;

    @XmlAttribute(name = "UserID")
    private String username;

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

    public XMLSeller(String username, Long rating) {
        this.rating = rating;
        this.username = username;
    }

    @Override
    public String toString() {
        return "XMLSeller{" +
                "rating='" + rating + '\'' +
                ", userId='" + username + '\'' +
                "}\n";
    }
}
