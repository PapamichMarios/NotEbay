package com.dit.ebay.controller;

import com.dit.ebay.request.BidRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.BidService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/app/items/{itemId}/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    private static final Logger logger = LoggerFactory.getLogger(BidController.class);

    @PostMapping
    public ResponseEntity<?> createBid(@PathVariable(value = "itemId") Long itemId,
                                       @Valid @RequestBody BidRequest bidRequest,
                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return bidService.createBid(itemId, bidRequest, currentUser);
    }
}
