package com.dit.ebay.controller;

import com.dit.ebay.request.BidRequest;
import com.dit.ebay.response.BidResponse;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.BidService;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.util.PaginationConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/app/items")
public class BidController {

    @Autowired
    private BidService bidService;

    private static final Logger logger = LoggerFactory.getLogger(BidController.class);

    @PostMapping("/{itemId}/bids")
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public ResponseEntity<?> createBid(@PathVariable(value = "itemId") Long itemId,
                                       @Valid @RequestBody BidRequest bidRequest,
                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return bidService.createBid(itemId, bidRequest, currentUser);
    }

    // example : /app/items/7/bids?page=0&size=3
    @GetMapping(path = "/owner/{itemId}/bids", params = {"page", "size"})
    //@GetMapping // <- if you uncomment this then you have to pass them as request param or use the default values
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public PagedResponse<BidResponse> getBids(@PathVariable(value = "itemId") Long itemId,
                                              @RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                              @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                              @Valid @CurrentUser UserDetailsImpl currentUser) {
        return bidService.getBids(itemId, currentUser, page, size);
    }

}
