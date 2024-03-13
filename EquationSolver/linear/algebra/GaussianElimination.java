package linear.algebra;

import java.util.*;

public class GaussianElimination {
    private double[][] matrix;
    private int rows;
    private int cols;

    public GaussianElimination(int rowCount, int colCount, double[][] inputMatrix) {
        if (inputMatrix.length != rowCount || inputMatrix[0].length != colCount) {
            throw new IllegalArgumentException("A bemeneti mátrix mérete nem megfelelő!");
        }

        matrix = new double[rowCount][colCount];
        for (int i = 0; i < rowCount; i++) 
        {
            matrix[i] = Arrays.copyOf(inputMatrix[i], colCount);
        }

        rows = rowCount;
        cols = colCount;
        }

        


    public double[][] getMatrix() {
        double[][] masolat = new double[rows][cols];
        for (int i = 0; i < rows; i++) 
        {
            masolat[i] = Arrays.copyOf(matrix[i], cols);
        }
        return masolat;
    }

    public int getRows() {
        return rows;
    }

    public int getCols() {
        return cols;
    }

    private void checkMatrixDimensions(double[][] matrix){
        if (matrix.length != rows || matrix[0].length != cols) 
        {
            throw new IllegalArgumentException("A sor- és oszlopszám nem egyezik a jelenlegi mátrixéval!");
        }
    }

    public void setMatrix(double[][] newMatrix) {
        checkMatrixDimensions(newMatrix);
        for (int i = 0; i < rows; i++) 
        {
            matrix[i] = Arrays.copyOf(newMatrix[i], cols);
        }
    }


    public void rowEchelonForm() {
        int h = 0;
        int k = 0;

        while (h < rows && k < cols){
           int maxRow = argMax(h,k);
            if(matrix[maxRow][k] == 0.0)
            {
                k +=1;
            }
            else{
                swapRows(h,maxRow);
                for(int j = k + 1; j < rows; j++)
                    {
                        multiplyAndAddRow(j,h,k);
                    }
                
                multiplyRow(h,k);
                h +=1;
                k +=1;
            }
        }

    }


    private int argMax(int row, int colIndex) {
        int maxRowIndex = row;
        double maxValue = Math.abs(matrix[row][colIndex]);

        for (int i = row + 1; i < matrix.length; i++) 
        {
            double value = Math.abs(matrix[i][colIndex]);
            if (value > maxValue) {
                maxValue = value;
                maxRowIndex = i;
            }
        }

        return maxRowIndex;
    }

    private void swapRows(int rowIndex1, int rowIndex2) {
        double[] temp = matrix[rowIndex1];
        matrix[rowIndex1] = matrix[rowIndex2];
        matrix[rowIndex2] = temp;
    }

    private void multiplyAndAddRow(int addRow, int mulRow, int colIndex) {
        double hanyados = matrix[addRow][colIndex] / matrix[mulRow][colIndex];
        for (int i = colIndex; i < cols; i++) 
        {
            matrix[addRow][i] -= hanyados * matrix[mulRow][i];
        }
    }

    private void multiplyRow(int rowIndex, int colIndex) {
        double oszto = matrix[rowIndex][colIndex];
        for (int i = 0; i < cols; i++) 
        {
            matrix[rowIndex][i] /= oszto;
        }
    }

        public void backSubstitution() {

        for (int i = rows - 1; i >= 0; i--) 
        {
            if (matrix[i][i] == 0) {
                throw new IllegalArgumentException("Megoldás nélküli egyenletrendszer!");
            }

            for (int j = i - 1; j >= 0; j--) {
                multiplyAndAddRow(j, i, i);
            }
        }
    }

public void print() {
    String[] variables = {"x","y","z="};
    for (int i = 0; i < rows; i++) {
        StringBuilder equation = new StringBuilder();

        for (int j = 0; j < cols; j++) {
            double coefficient = matrix[i][j];
                if(coefficient >= 0.0){
                equation.append("+");
                }
                equation.append(matrix[i][j]);
                if(j <3)
                {
                    equation.append(variables[j]);
                }
            
        }

        System.out.println(equation.toString());
    }
}

}