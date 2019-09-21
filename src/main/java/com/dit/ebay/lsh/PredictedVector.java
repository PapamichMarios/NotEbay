package com.dit.ebay.lsh;

public class PredictedVector {

    private Long itemId;

    private double predVal;

    public PredictedVector(Long itemId, double predVal) {
        this.itemId = itemId;
        this.predVal = predVal;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public double getPredVal() {
        return predVal;
    }

    public void setPredVal(double predVal) {
        this.predVal = predVal;
    }
}
