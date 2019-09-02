package com.dit.ebay.service;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Message;
import com.dit.ebay.model.MessageDeleteState;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.MessageRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.MessageRequest;
import com.dit.ebay.response.*;
import com.dit.ebay.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// Note : we could merge authorization of sender/receiver on get and delete in 1 query
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

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

    // constructs paged response
    // will only be used inside this class
    private PagedResponse<MessageHeaderResponse> createPagedResponse(Page<Message> messagesPaged, boolean getsSent) {
        if (messagesPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), messagesPaged.getNumber(),
                    messagesPaged.getSize(), messagesPaged.getTotalElements(),
                    messagesPaged.getTotalPages(), messagesPaged.isLast());
        }

        List<MessageHeaderResponse> messageResponses = new ArrayList<>();
        for (Message message : messagesPaged) {
            MessageHeaderResponse messageResponse = new MessageHeaderResponse(message);
            if (getsSent) messageResponse.setOtherUser(message.getUserReceiver());
            else messageResponse.setOtherUser(message.getUserSender());
            messageResponses.add(messageResponse);
        }

        return new PagedResponse<>(messageResponses, messagesPaged.getNumber(),
                messagesPaged.getSize(), messagesPaged.getTotalElements(),
                messagesPaged.getTotalPages(), messagesPaged.isLast());
    }

    public PagedResponse<MessageHeaderResponse> getSentMessages(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page,size);

        Page<Message> messagesPaged = messageRepository.findSentByUserId(currentUser.getId(), PageRequest.of(page, size, Sort.by("timeSent").descending()));

        return createPagedResponse(messagesPaged, true);
    }

    public PagedResponse<MessageHeaderResponse> getReceivedMessages(UserDetailsImpl currentUser, int page, int size) {
        validatePageParametersService.validate(page,size);

        Page<Message> messagesPaged = messageRepository.findReceivedByUserId(currentUser.getId(), PageRequest.of(page, size, Sort.by("timeSent").descending()));

        return createPagedResponse(messagesPaged, false);
    }

    // TODO : merge this 2 methods because they have the same functionality
    public MessageResponse getSentMessage(Long messageId, UserDetailsImpl currentUser) {
        authorizationService.checkSenderPerms(currentUser.getId(), messageId);

        Message message = messageRepository.findSentByMessageId(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", messageId));
        message.setSeen(true);
        messageRepository.save(message);
        MessageResponse messageResponse = new MessageResponse(message);
        messageResponse.setOtherUser(message.getUserReceiver());
        return messageResponse;
    }

    public MessageResponse getReceivedMessage(Long messageId, UserDetailsImpl currentUser) {
        authorizationService.checkReceiverPerms(currentUser.getId(), messageId);

        Message message = messageRepository.findReceivedByMessageId(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", messageId));
        message.setSeen(true);
        messageRepository.save(message);
        MessageResponse messageResponse = new MessageResponse(message);
        messageResponse.setOtherUser(message.getUserSender());
        return messageResponse;
    }


    public ResponseEntity<?> deleteSentMessage(Long messageId, UserDetailsImpl currentUser) {
        // Check if we can delete
        authorizationService.checkSenderPerms(currentUser.getId(), messageId);

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

    public ResponseEntity<?> deleteReceivedMessage(Long messageId, UserDetailsImpl currentUser) {
        // Check if we can delete
        authorizationService.checkReceiverPerms(currentUser.getId(), messageId);

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
