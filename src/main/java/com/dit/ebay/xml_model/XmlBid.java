package com.dit.ebay.xml_model;


import com.dit.ebay.model.Bid;
import com.dit.ebay.xml_model.xml_adapters.XmlDateAdapter;
import com.dit.ebay.xml_model.xml_adapters.XmlDollarAdapter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;
import java.sql.Timestamp;

@XmlRootElement(name = "Bid")
@XmlAccessorType(XmlAccessType.FIELD)
public class XmlBid {

    @XmlElement(name = "Bidder")
    private XmlBidder bidder;

    @XmlElement(name = "Time")
    @XmlJavaTypeAdapter(XmlDateAdapter.class)
    private Timestamp bidDate;

    @XmlElement(name = "Amount")
    @XmlJavaTypeAdapter(XmlDollarAdapter.class)
    private BigDecimal bidAmount;

    public XmlBid() {

    }

    public XmlBid(Bid bid) {
        this.bidDate = bid.getBidTime();
        this.bidAmount = bid.getBidAmount();
    }

    public XmlBidder getBidder() {
        return bidder;
    }

    public void setBidder(XmlBidder bidder) {
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

    @Override
    public String toString() {
        return "XmlBid{" +
                "bidder=" + bidder +
                ", bidDate=" + bidDate +
                ", bidAmmount=" + bidAmount +
                "}\n";
    }
}
