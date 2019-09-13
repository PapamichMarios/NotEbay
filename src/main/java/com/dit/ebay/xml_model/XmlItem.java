package com.dit.ebay.xml_model;

import com.dit.ebay.model.Item;
import com.dit.ebay.xml_model.xml_adapters.XmlDateAdapter;
import com.dit.ebay.xml_model.xml_adapters.XmlDollarAdapter;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

//@XmlRootElement(name = "Item")
@XmlAccessorType(XmlAccessType.FIELD)
public class XmlItem {

    @XmlAttribute(name = "ItemID")
    private String itemId;

    @XmlElement(name = "Name")
    private String name;

    @XmlElement(name = "Category")
    private List<String> category = new ArrayList<>();

    @XmlElement(name = "Currently")
    @XmlJavaTypeAdapter(XmlDollarAdapter.class)
    private BigDecimal currently;

    @XmlElement(name = "Buy_Price")
    @XmlJavaTypeAdapter(XmlDollarAdapter.class)
    private BigDecimal buyPrice;

    @XmlElement(name = "First_Bid")
    @XmlJavaTypeAdapter(XmlDollarAdapter.class)
    private BigDecimal firstBid;

    @XmlElement(name = "Number_of_Bids")
    private int numOfBids;

    @XmlElementWrapper(name="Bids")
    @XmlElement(name = "Bid")
    private List<XmlBid> bids = new ArrayList<>();

    @XmlElement(name = "Location")
    private XmlItemLocation location;

    @XmlElement(name = "Country")
    private String country;

    @XmlElement(name = "Started")
    @XmlJavaTypeAdapter(XmlDateAdapter.class)
    private Timestamp timeStarted;

    @XmlElement(name = "Ends")
    @XmlJavaTypeAdapter(XmlDateAdapter.class)
    private Timestamp timeEnds;

    @XmlElement(name = "Seller")
    private XmlSeller seller;

    @XmlElement(name = "Description")
    private String description;

    public XmlItem() {

    }

    public XmlItem(Item item) {
        this.itemId = item.getId().toString();
        this.name = item.getName();
        this.firstBid = item.getFirstBid();
        this.buyPrice = item.getBuyPrice();
        this.currently = item.getBestBid() != null ? item.getBestBid().getBidAmount() : firstBid;
        this.timeStarted = item.getTimeStarted();
        this.timeEnds = item.getTimeEnds();
        this.description = item.getDescription();
        this.country = item.getCountry();
        this.location = new XmlItemLocation(item.getLocation(), item.getGeoLat(), item.getGeoLong());
        this.numOfBids = item.getNumOfBids();
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public BigDecimal getCurrently() {
        return currently;
    }

    public void setCurrently(BigDecimal currently) {
        this.currently = currently;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(BigDecimal buyPrice) {
        this.buyPrice = buyPrice;
    }

    public BigDecimal getFirstBid() {
        return firstBid;
    }

    public void setFirstBid(BigDecimal firstBid) {
        this.firstBid = firstBid;
    }

    public int getNumOfBids() {
        return numOfBids;
    }

    public void setNumOfBids(int numOfBids) {
        this.numOfBids = numOfBids;
    }

    public List<XmlBid> getBids() {
        return bids;
    }

    public void setBids(List<XmlBid> bids) {
        this.bids = bids;
    }

    public XmlItemLocation getLocation() {
        return location;
    }

    public void setLocation(XmlItemLocation location) {
        this.location = location;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Timestamp getTimeStarted() {
        return timeStarted;
    }

    public void setTimeStarted(Timestamp timeStarted) {
        this.timeStarted = timeStarted;
    }

    public Timestamp getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(Timestamp timeEnds) {
        this.timeEnds = timeEnds;
    }

    public XmlSeller getSeller() {
        return seller;
    }

    public void setSeller(XmlSeller seller) {
        this.seller = seller;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void addBid(XmlBid xmlBid) {
        this.bids.add(xmlBid);
    }

    @Override
    public String toString() {
        return "XmlItem{" +
                "itemId='" + itemId + '\'' + "\n" +
                ", name='" + name + '\'' + "\n" +
                ", category=" + category + "\n" +
                ", currently=" + currently + "\n" +
                ", firstBid=" + firstBid + "\n" +
                ", numOfBids=" + numOfBids  + "\n" +
                ", bids=" + bids +
                ", location=" + location  + "\n" +
                ", country='" + country + '\''  + "\n" +
                ", timeStarted=" + timeStarted  + "\n" +
                ", timeEnds=" + timeEnds  + "\n" +
                ", seller=" + seller  + "\n" +
                ", description='" + description + '\'' +
                "}\n";
    }

}
