package com.dit.ebay.request;

import javax.validation.constraints.NotNull;

public class SubCategoryRequest {

    private Long parentId;

    public SubCategoryRequest(Long parentId) {
        this.parentId = parentId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}
