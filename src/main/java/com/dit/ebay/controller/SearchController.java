package com.dit.ebay.controller;

/*
 * This controller will be used to search items
 * We could avoid it and only use item controller instead
 */
import com.dit.ebay.request.SearchNameRequest;
import com.dit.ebay.request.SearchRequest;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.response.SearchResponse;
import com.dit.ebay.service.SearchService;
import com.dit.ebay.util.PaginationConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/app/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/itemName")
    public PagedResponse<SearchResponse> searchByItemName(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                          @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                          @Valid SearchNameRequest searchNameRequest) {
        return searchService.searchByItemName(searchNameRequest, page, size);
    }

    @GetMapping("/{categoryId}")
    public PagedResponse<SearchResponse> searchByCategoryId(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                            @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                            @PathVariable(value = "categoryId") Long categoryId) {
        return searchService.searchByCategoryId(categoryId, page, size);
    }

    @GetMapping("/mulFields")
    public PagedResponse<SearchResponse> searchByMultiFields(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                             @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                             @Valid SearchRequest searchRequest) {
        return searchService.searchByMultiFields(null, searchRequest, page, size);
    }

    @GetMapping("/{categoryId}/mulFields")
    public PagedResponse<SearchResponse> searchByMultiFields(@RequestParam(value = "page", defaultValue = PaginationConstants.DEFAULT_PAGE) int page,
                                                             @RequestParam(value = "size", defaultValue = PaginationConstants.DEFAULT_SIZE) int size,
                                                             @PathVariable(value = "categoryId") Long categoryId,
                                                             @Valid SearchRequest searchRequest) {
        return searchService.searchByMultiFields(categoryId, searchRequest, page, size);
    }
}
