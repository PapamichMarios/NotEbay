package lsh;

public class Utils {

    public double cosineDistance(int[] u, int[] v){

        double dot_product = 0.0;
        double length1 = 0.0;
        double length2 =0.0;
        double length_product = 0.0;

        for(int i=0; i<u.length; i++) {
            dot_product += u[i] * v[i];
            length1 += u[i] * u[i];
            length2 += v[i] * v[i];
        }

        length_product = Math.sqrt(length1 * length2);

        /*== dist(x,y = 1 - cos(x,y)
             cos(x,y) = x*y/|x|*|y|
          ==*/
        return (1 - dot_product/length_product);
    }
}
