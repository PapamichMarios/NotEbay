package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

public class CSVBid {
    @CsvBindByName(column ="user_name")
    private String username;

    @CsvBindByName(column = "item_name")
    private String itemName;

    @CsvBindByName(column = "bid_amount")
    private double bidAmount;

    @CsvBindByName(column = "accepted")
    private boolean accepted;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
