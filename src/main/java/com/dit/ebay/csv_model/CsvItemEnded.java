package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

import java.sql.Timestamp;

// ---could also use inheritance
// ---but using safe extra class cause the csv reader format
public class CsvItemEnded extends CsvItem {
    // extra field
    @CsvBindByName(column = "time_started")
    private Timestamp timeStarted;

    public void setTimeStarted(Timestamp timeStarted) {
        this.timeStarted = timeStarted;
    }

    public Timestamp getTimeStarted() {
        return timeStarted;
    }

}

