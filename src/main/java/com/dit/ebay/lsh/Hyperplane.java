package com.dit.ebay.lsh;
import java.util.*;

public class Hyperplane {

    private double[] v;

    public Hyperplane(int dimensions) {

        //v: normal distribution vector N(0,1)
        Random random = new Random();
        this.v = new double[dimensions];
        for (int i = 0; i < this.v.length; i++) {
            this.v[i] = random.nextGaussian();
        }
    }

    public int Hyperplane_ComputeH(double[] p) {
        double dot_product=0;

        for (int i = 0; i < p.length; i++) {
            dot_product += this.v[i] * p[i];
        }

        if (dot_product > 0)
            return 1;

        return 0;
    }

    public void Hyperplane_Print() {
        System.out.print("v: ");
        for (int i=0; i < this.v.length; i++) {
            System.out.print(this.v[i] + " ");
        }
        System.out.println();
    }
}