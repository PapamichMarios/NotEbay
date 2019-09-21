package com.dit.ebay.lsh;

import java.util.ArrayList;
import java.util.Collections;

public class Recommendation {

    public static ArrayList<Neighbour> getRecommendationNeighbours(ArrayList<Neighbour> allNeighbours) {

        //sort neighbourhood
        Collections.sort(allNeighbours, new NeighbourComparator());

        //return the 50 closest neighbours
        if(allNeighbours.size() > 50) {

            ArrayList<Neighbour> neighbourhood = new ArrayList<Neighbour>();
            for(int i=0; i<50; i++)
                neighbourhood.add(allNeighbours.get(i));

            return neighbourhood;

        } else {

            return allNeighbours;
        }
    }

    public static double[] predictItem(ArrayList<Neighbour> neighbours, double[] user) {

        //items already seen
        int[] itemsBid = new int[user.length];

        //turn cosine distances into similarities
        for(int i=0; i<neighbours.size(); i++)
            neighbours.get(i).setDistance(1-neighbours.get(i).getDistance());

        //calculate normalising factor zeta
        double zeta = 0;
        for(int i=0; i<neighbours.size(); i++)
            zeta += Math.abs(neighbours.get(i).getDistance());

        zeta = 1/zeta;

        //prediction
        for(int i=0; i<user.length; i++){

            //skip already seen items
            if(itemsBid[i] == 1)
                continue;

            double similarity_factor = 0;
            for(int j=0; j<neighbours.size(); j++)
                similarity_factor += neighbours.get(j).getDistance() * neighbours.get(j).getKey()[i];

            user[i] = zeta * similarity_factor;
        }

        return user;
    }
}
