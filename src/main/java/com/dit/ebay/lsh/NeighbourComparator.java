package com.dit.ebay.lsh;

import java.util.Comparator;

public class NeighbourComparator implements Comparator<Neighbour> {
    @Override
    public int compare(Neighbour c1, Neighbour c2) {
        return Double.compare(c1.getDistance(), c2.getDistance());
    }
}
