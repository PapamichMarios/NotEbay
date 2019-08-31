package com.dit.ebay.response;

import com.dit.ebay.model.Message;
import com.dit.ebay.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Timestamp;

public class MessageHeaderResponse {

    private Long id;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User otherUser;

    private String header;

    private Timestamp timeSent;

    private boolean seen;

    public User getOtherUser() {
        return otherUser;
    }

    public MessageHeaderResponse() {

    }

    public MessageHeaderResponse(Message message) {
        this.id = message.getId();
        this.otherUser = null;
        this.header = message.getHeader();
        this.timeSent = message.getTimeSent();
        this.seen = message.isSeen();
    }

    public void setOtherUser(User otherUser) {
        this.otherUser = otherUser;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getTimeSent() {
        return timeSent;
    }

    public void setTimeSent(Timestamp timeSent) {
        this.timeSent = timeSent;
    }

    public boolean isSeen() { return seen; }

    public void setSeen(boolean seen) { this.seen = seen; }
}
