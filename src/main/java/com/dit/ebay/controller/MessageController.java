package com.dit.ebay.controller;

import com.dit.ebay.request.MessageRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/app/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public ResponseEntity<?> createMessage(@Valid @RequestBody MessageRequest messageRequest,
                                           @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.createMessage(messageRequest, currentUser);
    }



    /*
     * Deletes for sender and receiver
     */
    @DeleteMapping("/send/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public ResponseEntity<?> deleteSenderMessage(@PathVariable(value = "messageId") Long messageId,
                                                   @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.deleteSenderMessage(messageId, currentUser);
    }

    @DeleteMapping("/received/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public ResponseEntity<?> deleteReceiverMessage(@PathVariable(value = "messageId") Long messageId,
                                                   @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.deleteReceiverMessage(messageId, currentUser);
    }
}