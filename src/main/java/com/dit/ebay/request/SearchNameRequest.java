package com.dit.ebay.request;

import javax.validation.constraints.Size;

public class SearchNameRequest {

    @Size(max = 80)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
