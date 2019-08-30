package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

public class CSVMessage {

    @CsvBindByName(column = "senderUsername")
    private String senderUsername;

    @CsvBindByName(column = "receiverUsername")
    private String receiverUsername;

    @CsvBindByName(column = "header")
    private String header;

    @CsvBindByName(column = "message")
    private String message;

    public CSVMessage() {

    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public String getReceiverUsername() {
        return receiverUsername;
    }

    public String getHeader() {
        return header;
    }

    public String getMessage() {
        return message;
    }
}
