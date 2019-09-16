package com.dit.ebay.controller;

import com.dit.ebay.request.MessageRequest;
import com.dit.ebay.response.MessageHeaderResponse;
import com.dit.ebay.response.MessageResponse;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.MessageService;
import com.dit.ebay.util.PaginationConstants;
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

    @GetMapping(path = "/sent", params = {"page", "size"})
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public PagedResponse<MessageHeaderResponse> getSentMessages(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                                @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                                @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.getSentMessages(currentUser, page, size);
    }

    @GetMapping(path = "/received", params = {"page", "size"})
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public PagedResponse<MessageHeaderResponse> getReceivedMessages(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                                    @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                                    @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.getReceivedMessages(currentUser, page, size);
    }

    @GetMapping("/sent/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public MessageResponse getSentMessage(@PathVariable(value = "messageId") Long messageId,
                                          @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.getSentMessage(messageId, currentUser);
    }

    @GetMapping("/received/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public MessageResponse getReceivedMessage(@PathVariable(value = "messageId") Long messageId,
                                              @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.getReceivedMessage(messageId, currentUser);
    }

    /*
     * Deletes for sender and receiver
     */
    @DeleteMapping("/sent/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public ResponseEntity<?> deleteSentMessage(@PathVariable(value = "messageId") Long messageId,
                                               @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.deleteSentMessage(messageId, currentUser);
    }

    @DeleteMapping("/received/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_SELLER', 'ROLE_BIDDER')")
    public ResponseEntity<?> deleteReceivedMessage(@PathVariable(value = "messageId") Long messageId,
                                                   @Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.deleteReceivedMessage(messageId, currentUser);
    }

    @GetMapping("/unseen")
    public Long getNotificationsOfMessages(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return messageService.getNotificationsOfMessages(currentUser);
    }
}