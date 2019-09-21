package com.dit.ebay.lsh;

public class HashNode {
    private int[] key;
    private String G;
    private HashNode next;
    private String id;

    public HashNode(int[] key, String G, String id) {
        this.key = key;
        this.G = G;
        this.id = id;
        this.next = null;
    }

    public int[] getKey() {
        return key;
    }

    public void setKey(int[] key) {
        this.key = key;
    }

    public String getG() {
        return G;
    }

    public void setG(String g) {
        G = g;
    }

    public HashNode getNext() {
        return next;
    }

    public void setNext(HashNode next) {
        this.next = next;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
