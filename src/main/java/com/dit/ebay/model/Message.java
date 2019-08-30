package com.dit.ebay.model;

import com.dit.ebay.request.MessageRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "messages", schema = "ted_db")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User userSender;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User userReceiver;

    @Enumerated(EnumType.STRING)
    @Column(name = "delete_state")
    private MessageDeleteState messageDeleteState;

    @Column(name = "header")
    private String header;

    @Column(name = "message")
    private String message;

    @CreatedDate
    @Column(name = "time_sent")
    private Timestamp timestamp;

    public Message() {

    }

    public Message(MessageRequest messageRequest) {
        this.header = messageRequest.getHeader();
        this.message = messageRequest.getMessage();
        this.messageDeleteState = MessageDeleteState.DEL_NON;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUserSender() {
        return userSender;
    }

    public void setUserSender(User userSender) {
        this.userSender = userSender;
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

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public User getUserReceiver() {
        return userReceiver;
    }

    public void setUserReceiver(User userReceiver) {
        this.userReceiver = userReceiver;
    }

    public MessageDeleteState getMessageDeleteState() {
        return messageDeleteState;
    }

    public void setMessageDeleteState(MessageDeleteState messageDeleteState) {
        this.messageDeleteState = messageDeleteState;
    }
}
