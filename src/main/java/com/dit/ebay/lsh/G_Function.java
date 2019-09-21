package com.dit.ebay.lsh;

public class G_Function {
    private int k;
    private int dim;
    private Hyperplane[] h_array;

    public G_Function(int k, int dim) {
        this.k = k;
        this.dim = dim;

        //construct the array of hyperplanes
        this.h_array = new Hyperplane[k];
        for(int i=0; i<k; i++) {
            this.h_array[i] = new Hyperplane(dim);
        }
    }

    public int G_Function_HashValue(double[] x) {
        String hash_val = "";

        for(int i=0; i<this.k; i++) {
            hash_val += String.valueOf(this.h_array[i].Hyperplane_ComputeH(x));
        }

        return Integer.parseInt(hash_val, 2);
    }
}
