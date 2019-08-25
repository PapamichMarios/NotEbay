package com.dit.ebay.response;

public class CompositePagedResponse<S, T> {
    private PagedResponse<S> pagedResponse1; // Item
    private PagedResponse<T> pagedResponse2; // Bids

    public CompositePagedResponse() {

    }

    public CompositePagedResponse(PagedResponse<S> pagedResponse1, PagedResponse<T> pagedResponse2) {
        this.pagedResponse1 = pagedResponse1;
        this.pagedResponse2 = pagedResponse2;
    }

    public PagedResponse<S> getPagedResponse1() {
        return pagedResponse1;
    }

    public void setPagedResponse1(PagedResponse<S> pagedResponse1) {
        this.pagedResponse1 = pagedResponse1;
    }

    public PagedResponse<T> getPagedResponse2() {
        return pagedResponse2;
    }

    public void setPagedResponse2(PagedResponse<T> pagedResponse2) {
        this.pagedResponse2 = pagedResponse2;
    }
}