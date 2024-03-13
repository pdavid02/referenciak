package linear;
import linear.algebra.GaussianElimination;
import java.util.*;

public class EquationSolver {
    public static void main(String[] args) {
        double[][] matrix = new double[args.length][];
        for (int i = 0; i < args.length; i++) {
            String[] sor = args[i].split(",");
            matrix[i] = stringsToDoubles(sor);
        }

        GaussianElimination gaussianElimination = new GaussianElimination(args.length, matrix[0].length, matrix);

        gaussianElimination.print();
        gaussianElimination.rowEchelonForm();
        gaussianElimination.print();
        gaussianElimination.backSubstitution();
        gaussianElimination.print();
    }


    public static double[] stringsToDoubles(String[] string){
        double[] values = new double[string.length];

        for(int i = 0; i < string.length; i++){
            values[i] = Double.parseDouble(string[i]);
        }

        return values;
    }
}