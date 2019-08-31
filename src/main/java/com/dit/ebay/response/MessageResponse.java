package com.dit.ebay.response;

import com.dit.ebay.model.Message;

public class MessageResponse extends MessageHeaderResponse {
    private String message;

    public MessageResponse(Message message) {
        super(message);
        this.message = message.getMessage();
    }

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
