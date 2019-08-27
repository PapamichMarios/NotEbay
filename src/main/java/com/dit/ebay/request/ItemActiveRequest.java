package com.dit.ebay.request;

import javax.validation.constraints.NotBlank;

public class ItemActiveRequest {

    @NotBlank
    private boolean active;

    public ItemActiveRequest() {

    }

    public ItemActiveRequest(boolean active) {
        this.active = active;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
