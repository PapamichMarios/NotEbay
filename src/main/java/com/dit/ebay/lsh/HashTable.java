package com.dit.ebay.lsh;

import java.util.ArrayList;

public class HashTable {

    private HashNode[] table;
    private int tableSize;
    private G_Function hash_function;

    public HashTable(int tableSize, int k, int dimensions) {
        this.table = new HashNode[tableSize];
        this.tableSize = tableSize;

        //construct object used for hashing
        this.hash_function = new G_Function(k, dimensions);
    }

    public void HashTable_Put(int[] key, String id){

        //find the hash value
        int hash_val = this.hash_function.G_Function_HashValue(key);

        HashNode prev = null;
        HashNode entry = this.table[hash_val];
        while(entry != null) {
            prev = entry;
            entry = entry.getNext();
        }

        //create new node
        entry = new HashNode(key, String.valueOf(hash_val), id);

        //check if the bucket is null
        if(prev == null) {
            //assign as first in the bucket
            this.table[hash_val] = entry;
        } else {
            //assign to the next pointer of the last node
            prev.setNext(entry);
        }

    }

    public void HashTable_GetNeighbourhood(int []key) {
        //find the hash value
        int hash_val = this.hash_function.G_Function_HashValue(key);

        //iterate to bucket
        ArrayList<int[]> neighbours = new ArrayList<int[]>();
        ArrayList<Double> distances = new ArrayList<Double>();

        HashNode entry = this.table[hash_val];
        while(entry != null) {

            neighbours.add(entry.getKey());
            //calculate cosine distance with the neighbour


            entry = entry.getNext();
        }
    }

}
