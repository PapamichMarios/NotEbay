package com.dit.ebay.service;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Message;
import com.dit.ebay.model.MessageDeleteState;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.MessageRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.MessageRequest;
import com.dit.ebay.response.ApiResponse;
import com.dit.ebay.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorizationService authorizationService;

    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    public ResponseEntity<?> createMessage(MessageRequest messageRequest, UserDetailsImpl currentUser) {
        // get logged in user
        User userSender = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
        // get he user we will sent the message
        User userReceiver = userRepository.findByUsername(messageRequest.getReceiverUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", messageRequest.getReceiverUsername()));


        Message message = new Message(messageRequest);
        message.setUserSender(userSender);
        message.setUserReceiver(userReceiver);

        Message result = messageRepository.save(message);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{messageId}")
                .buildAndExpand(message.getId()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "Message created successfully.", result));
    }

    public ResponseEntity<?> deleteSenderMessage(Long messageId, UserDetailsImpl currentUser) {
        // Check if we can delete
        authorizationService.checkDeleteSenderPerms(currentUser.getId(), messageId);

        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", messageId));

        MessageDeleteState msgDeleteState = message.getMessageDeleteState();
        if (msgDeleteState.equals(MessageDeleteState.DEL_NON)) {
            message.setMessageDeleteState(MessageDeleteState.DEL_SEN);
            messageRepository.save(message); // update state
        } else {
            // the actual deletion
            messageRepository.delete(message);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "Message Deleted Successfully."));
    }

    public ResponseEntity<?> deleteReceiverMessage(Long messageId, UserDetailsImpl currentUser) {
        // Check if we can delete
        authorizationService.checkDeleteReceiverPerms(currentUser.getId(), messageId);

        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", messageId));

        MessageDeleteState msgDeleteState = message.getMessageDeleteState();
        if (msgDeleteState.equals(MessageDeleteState.DEL_NON)) {
            message.setMessageDeleteState(MessageDeleteState.DEL_REC);
            messageRepository.save(message); // update state
        } else {
            // the actual deletion
            messageRepository.delete(message);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "Message Deleted Successfully."));
    }

}
