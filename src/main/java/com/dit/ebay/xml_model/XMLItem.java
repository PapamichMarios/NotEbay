package com.dit.ebay.xml_model;

import com.dit.ebay.xml_model.xml_adapters.XMLDateAdapter;
import com.dit.ebay.xml_model.xml_adapters.XMLDollarAdapter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@XmlRootElement(name = "Item")
@XmlAccessorType(XmlAccessType.FIELD)
public class XMLItem {

    @XmlAttribute(name = "ItemID")
    private String itemId;

    @XmlElement(name = "Name")
    private String name;

    @XmlElement(name = "Category")
    private List<String> category = null;

    @XmlElement(name = "Currently")
    @XmlJavaTypeAdapter(XMLDollarAdapter.class)
    private BigDecimal currently;

    @XmlElement(name = "Buy_Price")
    @XmlJavaTypeAdapter(XMLDollarAdapter.class)
    private BigDecimal buyPrice;

    @XmlElement(name = "First_Bid")
    @XmlJavaTypeAdapter(XMLDollarAdapter.class)
    private BigDecimal firstBid;

    @XmlElement(name = "Number_of_Bids")
    private int numOfBids;

    @XmlElementWrapper(name="Bids")
    @XmlElement(name = "Bid")
    private List<XMLBid> bids = null;

    @XmlElement(name = "Location")
    private XMLItemLocation location;

    @XmlElement(name = "Country")
    private String country;

    @XmlElement(name = "Started")
    @XmlJavaTypeAdapter(XMLDateAdapter.class)
    private Timestamp timeStarted;

    @XmlElement(name = "Ends")
    @XmlJavaTypeAdapter(XMLDateAdapter.class)
    private Timestamp timeEnds;

    @XmlElement(name = "Seller")
    private XMLSeller seller;

    @XmlElement(name = "Description")
    private String description;

    /*
    public XMLItem(String name, String currently, String firstBid, int numOfBids,
                   String location, String country, String description) {
        this.name = name;
        //this.currently = currently;
        //this.firstBid = firstBid;
        this.numOfBids = numOfBids;
        //this.location = location;
        this.country = country;
        this.description = description;
    }

    public XMLItem() {
        this.itemId = "1111111";
        this.name = "1";
        this.currently = 12.3;
        this.firstBid = 213.912;
        this.numOfBids = 2;
        this.location = new XMLItemLocation();
        this.country = "423";
        this.description = "dadasd";
        this.seller = new XMLSeller();
        this.bids = new ArrayList<>();
        this.bids.add(new XMLBid());
        this.bids.add(new XMLBid());
        this.bids.add(new XMLBid());
        this.bids.add(new XMLBid());
        this.bids.add(new XMLBid());
        this.bids.add(new XMLBid());
        this.timeStarted = new Timestamp(System.currentTimeMillis());
        timeStarted.setNanos(0); // don't count millis
        this.timeEnds = new Timestamp(System.currentTimeMillis());
        timeEnds.setNanos(0); // don't count millis
        this.category = new ArrayList<>();
    }
    */

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

    public List<XMLBid> getBids() {
        return bids;
    }

    public void setBids(List<XMLBid> bids) {
        this.bids = bids;
    }

    public XMLItemLocation getLocation() {
        return location;
    }

    public void setLocation(XMLItemLocation location) {
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

    public XMLSeller getSeller() {
        return seller;
    }

    public void setSeller(XMLSeller seller) {
        this.seller = seller;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "XMLItem{" +
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
