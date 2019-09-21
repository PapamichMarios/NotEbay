package com.dit.ebay.lsh;

import com.dit.ebay.util.LshConstants;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class HashTable {

    private HashNode[] table;
    private int tableSize;
    private G_Function hash_function;
    private final static int CN = LshConstants.CN;

    public HashTable(int tableSize, int k, int dimensions) {
        this.table = new HashNode[tableSize];
        this.tableSize = tableSize;

        //construct object used for hashing
        this.hash_function = new G_Function(k, dimensions);
    }

    public void HashTable_Put(double[] key, Long id){

        //find the hash value
        int hash_val = this.hash_function.G_Function_HashValue(key);

        HashNode prev = null;
        HashNode entry = this.table[hash_val];
        while (entry != null) {
            prev = entry;
            entry = entry.getNext();
        }

        //create new node
        entry = new HashNode(key, String.valueOf(hash_val), id);

        //check if the bucket is null
        if (prev == null) {
            //assign as first in the bucket
            this.table[hash_val] = entry;
        } else {
            //assign to the next pointer of the last node
            prev.setNext(entry);
        }

    }

    public ArrayList<Neighbour> HashTable_GetNeighbourhood(double []key) {
        //find the hash value
        int hash_val = this.hash_function.G_Function_HashValue(key);

        //iterate to bucket
        ArrayList<Neighbour> neighbours = new ArrayList<>();

        HashNode entry = this.table[hash_val];
        while (entry != null) {

            double distance = Utils.cosineDistance(entry.getKey(), key);
            neighbours.add(new Neighbour(entry.getId(),
                                         entry.getKey(),
                                         distance));

            entry = entry.getNext();
        }

        //sort neighbourhood
        Collections.sort(neighbours, new NeighbourComparator());
        // debug print
        /*
        for (Neighbour neighbour : neighbours) {
            System.out.println(neighbour.getDistance());
        }
        */

        //return the CN closest neighbours
        if (neighbours.size() > CN) {

            ArrayList<Neighbour> neighbourhood = new ArrayList<>();
            for (int i = 0; i < CN; i++)
                neighbourhood.add(neighbours.get(i));

            return neighbourhood;

        } else {

            return neighbours;
        }
    }

}
