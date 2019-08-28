package com.dit.ebay.controller;

import com.dit.ebay.model.Item;
import com.dit.ebay.request.ItemActiveRequest;
import com.dit.ebay.request.ItemRequest;
import com.dit.ebay.response.BidderItemResponse;
import com.dit.ebay.response.ItemResponse;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.ItemService;
import com.dit.ebay.util.PaginationConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/*
 * Only for users with role SELLER and Bidder
 * all get etc with prefix Seller mean that we fetch / change /.. seller's item
 * all get etc with prefix Bidder mean tha we do something on others seller item
 */
@RestController
@RequestMapping("/app/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

    /*
     * ---For Seller---
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> createItem(@Valid @RequestBody ItemRequest itemRequest,
                                        @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.createItem(currentUser, itemRequest);
    }

    // Get items (auctions) of current logged in user
    // Note don't need to transform Page<Item> => PagedResponse<Item> (did it to be more simple for the json response)
    @GetMapping(params = {"page", "size"})
    //@GetMapping
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public PagedResponse<ItemResponse> getSellerItems(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                      @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                      @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getSellerItems(currentUser, page, size);
    }

    // Get currents Logged in item info
    // must be the owner here the item id changes
    @GetMapping("/owner/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ItemResponse getSellerItemById(@PathVariable(value = "itemId") Long itemId,
                                          @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getSellerItemById(itemId, currentUser);
    }

    @PutMapping("/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item updateSellerItemById(@PathVariable(value = "itemId") Long itemId,
                                     @Valid @RequestBody ItemRequest itemRequest,
                                     @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.updateSellerItemById(itemId, itemRequest, currentUser);
    }

    // update status
    @PutMapping("/{itemId}/active")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item updateSellerActiveById(@PathVariable(value = "itemId") Long itemId,
                                       @Valid @RequestBody ItemActiveRequest itemActiveRequest,
                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.updateSellerItemById(itemId, itemActiveRequest, currentUser);
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> deleteSellerItemById(@PathVariable(value = "itemId") Long itemId,
                                                  @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.deleteSellerItemById(itemId);
    }

    /*
     * ---For Bidder---
     */
    @GetMapping("/{itemId}")
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public BidderItemResponse getBidderItemById(@PathVariable(value = "itemId") Long itemId,
                                                @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getBidderItemById(itemId);
    }

    // get items bidder has bid on  and is the best bid (last)
    @GetMapping(path = "/bestBidItems", params = {"page", "size"})
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public PagedResponse<ItemResponse> getBestBidItems(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                       @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getBestBidItems(currentUser, page, size);
    }

    @GetMapping(path = "/bidsWonItems", params = {"page", "size"})
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public PagedResponse<ItemResponse> getBidWonItems(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                      @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                      @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getBidsWonItems(currentUser, page, size);
    }
}
