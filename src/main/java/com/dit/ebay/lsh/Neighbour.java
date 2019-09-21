package com.dit.ebay.lsh;

import java.util.Collections;
import java.util.Comparator;

public class Neighbour {
    private Long id;
    private double[] key;
    private double distance;

    public Neighbour(Long id, double[] key, double distance) {
        this.id = id;
        this.key = key;
        this.distance = distance;
    }

    public Long getUserName() {
        return id;
    }

    public void setUserName(Long userName) {
        this.id = userName;
    }

    public double[] getKey() {
        return key;
    }

    public void setKey(double[] key) {
        this.key = key;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "[ userName=" + id + ", distance=" + distance + "]";
    }
}
