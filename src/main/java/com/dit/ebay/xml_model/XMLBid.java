package com.dit.ebay.xml_model;


import com.dit.ebay.xml_model.xml_adapters.XMLDateAdapter;
import com.dit.ebay.xml_model.xml_adapters.XMLDollarAdapter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;
import java.sql.Timestamp;

@XmlRootElement(name = "Bid")
@XmlAccessorType(XmlAccessType.FIELD)
public class XMLBid {

    @XmlElement(name = "Bidder")
    private XMLBidder bidder;

    @XmlElement(name = "Time")
    @XmlJavaTypeAdapter(XMLDateAdapter.class)
    private Timestamp bidDate;

    @XmlElement(name = "Amount")
    @XmlJavaTypeAdapter(XMLDollarAdapter.class)
    private BigDecimal bidAmount;


    public XMLBidder getBidder() {
        return bidder;
    }

    public void setBidder(XMLBidder bidder) {
        this.bidder = bidder;
    }

    public Timestamp getBidDate() {
        return bidDate;
    }

    public void setBidDate(Timestamp bidDate) {
        this.bidDate = bidDate;
    }

    public BigDecimal getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(BigDecimal bidAmount) {
        this.bidAmount = bidAmount;
    }

    /*
    public XMLBid() {
        this.bidder = new XMLBidder();
        this.bidDate = new Timestamp(System.currentTimeMillis());
        bidDate.setNanos(0); // don't count millis
        this.bidAmmount = 21.9;
    }
    */

    @Override
    public String toString() {
        return "XMLBid{" +
                "bidder=" + bidder +
                ", bidDate=" + bidDate +
                ", bidAmmount=" + bidAmount +
                "}\n";
    }
}
