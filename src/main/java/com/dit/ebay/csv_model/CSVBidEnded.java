package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

import java.sql.Timestamp;

public class CSVBidEnded extends CSVBid {

    @CsvBindByName(column = "bid_time")
    private Timestamp bidTime;

    public Timestamp getBidTime() {
        return bidTime;
    }

    public void setBidTime(Timestamp bidTime) {
        this.bidTime = bidTime;
    }
}
