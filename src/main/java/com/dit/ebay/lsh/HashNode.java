package com.dit.ebay.lsh;

public class HashNode {
    private double[] key;
    private String G;
    private HashNode next;
    private Long id;

    public HashNode(double[] key, String G, Long id) {
        this.key = key;
        this.G = G;
        this.id = id;
        this.next = null;
    }

    public double[] getKey() {
        return key;
    }

    public void setKey(double[] key) {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
