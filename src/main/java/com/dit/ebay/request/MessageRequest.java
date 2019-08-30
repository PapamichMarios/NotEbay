package com.dit.ebay.request;

import javax.validation.constraints.NotNull;

public class MessageRequest {

    // where we sent the message
    // unique in the user table
    // we could also use username
    @NotNull
    private String receiverUsername;

    private String header;

    private String message;

    public MessageRequest() {

    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setReceiverUsername(String receiverUsername) {
        this.receiverUsername = receiverUsername;
    }

    public String getReceiverUsername() {
        return receiverUsername;
    }
}
