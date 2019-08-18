package com.dit.ebay.controller;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.request.BidRequest;
import com.dit.ebay.response.BidResponse;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.BidService;
import com.dit.ebay.util.PagedResponse;
import com.dit.ebay.util.PaginationConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/app/items/{itemId}/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @Autowired
    private BidRepository bidRepository;

    private static final Logger logger = LoggerFactory.getLogger(BidController.class);

    @PostMapping
    @PreAuthorize("hasRole('ROLE_B<3 <IDDER')")
    public ResponseEntity<?> createBid(@PathVariable(value = "itemId") Long itemId,
                                       @Valid @RequestBody BidRequest bidRequest,
                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return bidService.createBid(itemId, bidRequest, currentUser);
    }

    @GetMapping(params = { "page", "size" })
    //@GetMapping
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public PagedResponse<BidResponse> getBids(@PathVariable(value = "itemId") Long itemId,
                                              @RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                              @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                              @Valid @CurrentUser UserDetailsImpl currentUser) {
        return bidService.getBids(itemId, currentUser, page, size);
    }


    /*
     * Only for testing
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public List<Bid> getAll() {
        List<Bid> l =  bidRepository.findAlll((long) 7);
        for (Bid item : l) {
            System.out.println(item);
        }
        return l;
    }

}
