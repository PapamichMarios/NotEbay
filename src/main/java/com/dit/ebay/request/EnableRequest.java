package com.dit.ebay.request;

import javax.validation.constraints.NotNull;

public class EnableRequest {

    @NotNull
    private boolean enable;

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
}
