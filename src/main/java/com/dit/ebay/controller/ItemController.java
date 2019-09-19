package com.dit.ebay.controller;

import com.dit.ebay.json_model.JsonItems;
import com.dit.ebay.model.Item;
import com.dit.ebay.request.ItemActiveRequest;
import com.dit.ebay.request.ItemRequest;
import com.dit.ebay.response.BidderItemResponse;
import com.dit.ebay.response.ItemResponse;
import com.dit.ebay.response.OwnerItemResponse;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.security.UserDetailsImpl;
import com.dit.ebay.service.ItemService;
import com.dit.ebay.service.JsonService;
import com.dit.ebay.service.XmlService;
import com.dit.ebay.util.PaginationConstants;
import com.dit.ebay.xml_model.XmlItems;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.Converter;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/*
 * Only for users with role SELLER and Bidder
 * all get etc with prefix Seller mean that we fetch / change /.. seller's item
 * all get etc with prefix Bidder mean tha we do something on others seller item
 */
@RestController
@RequestMapping("/app")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private XmlService xmlService;

    @Autowired
    private JsonService jsonService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

    /*
     * ---For Seller---
     */
    @PostMapping(path = "/items")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> createItem(@RequestParam("itemRequest") String itemRequest,
                                        @RequestParam("file") List<MultipartFile> file,
                                        @Valid @CurrentUser UserDetailsImpl currentUser)
            throws JsonParseException, JsonMappingException, IOException {
        ItemRequest itemRequestReal = objectMapper.readValue(itemRequest, ItemRequest.class);
        return itemService.createItem(currentUser, itemRequestReal, file);
    }

    // Get items (auctions) of current logged in user
    // Note don't need to transform Page<Item> => PagedResponse<Item> (did it to be more simple for the json response)
    @GetMapping("/items")
    //@GetMapping
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public PagedResponse<ItemResponse> getSellerItems(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                      @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                      @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getSellerItems(currentUser, page, size);
    }

    // Get currents Logged in item info
    // must be the owner here the item id changes
    @GetMapping("items/owner/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public OwnerItemResponse getSellerItemById(@PathVariable(value = "itemId") Long itemId,
                                               @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getSellerItemById(itemId, currentUser);
    }

    @PutMapping("items/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item updateSellerItemById(@PathVariable(value = "itemId") Long itemId,
                                     @Valid @RequestBody ItemRequest itemRequest,
                                     @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.updateSellerItemById(itemId, itemRequest, currentUser);
    }

    // update status
    @PutMapping("items/{itemId}/active")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public Item updateSellerActiveById(@PathVariable(value = "itemId") Long itemId,
                                       @Valid @RequestBody ItemActiveRequest itemActiveRequest,
                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.updateSellerItemById(itemId, itemActiveRequest, currentUser);
    }

    @DeleteMapping("items/{itemId}")
    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ResponseEntity<?> deleteSellerItemById(@PathVariable(value = "itemId") Long itemId,
                                                  @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.deleteSellerItemById(itemId);
    }

    /*
     * ---For Bidder---
     */
    @GetMapping("items/{itemId}")
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public BidderItemResponse getBidderItemById(@PathVariable(value = "itemId") Long itemId,
                                                @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getBidderItemById(itemId);
    }

    // get items bidder has bid on  and is the best bid (last)
    @GetMapping(path = "items/bestBidItems", params = {"page", "size"})
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public PagedResponse<ItemResponse> getBestBidItems(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                       @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                       @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getBestBidItems(currentUser, page, size);
    }

    @GetMapping(path = "items/bidsWonItems", params = {"page", "size"})
    @PreAuthorize("hasRole('ROLE_BIDDER')")
    public PagedResponse<ItemResponse> getBidWonItems(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                      @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                      @Valid @CurrentUser UserDetailsImpl currentUser) {
        return itemService.getBidsWonItems(currentUser, page, size);
    }

    /*
     * Export fro json and xml
     */
    @GetMapping(path = "users/{userId}/items/xml", produces = {MediaType.APPLICATION_XML_VALUE})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public XmlItems getXmlItems(@PathVariable(value = "userId") Long userId,
                                @Valid @CurrentUser UserDetailsImpl currentUser) {
            return xmlService.getXmlItems(userId);
    }

    @GetMapping(path = "users/{userId}/items/json", produces = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public JsonItems getJsonItems(@PathVariable(value = "userId") Long userId,
                                  @Valid @CurrentUser UserDetailsImpl currentUser) {
        return jsonService.getJsonItems(userId);
    }

    @GetMapping(path = "/items/xml", produces = {MediaType.APPLICATION_XML_VALUE})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public XmlItems getXmlAllItems(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return xmlService.getAllXmlItems();
    }

    @GetMapping(path = "/items/json", produces = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public JsonItems getJsonAllItems(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return jsonService.getAllJsonItems();
    }

}
