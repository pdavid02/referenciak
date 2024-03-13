/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package progtechbead2;
/**
 *
 * @author peter
 */
import java.util.ArrayList;

public class GameModel {
    
    private final Tile[][] board;

    private final Player[] players;

    private int currentPlayer;

    public GameModel(int boardSize) {
        if (boardSize < 1) {
            throw new IllegalArgumentException();
        }

        this.board = new Tile[boardSize][boardSize];

        for (int i = 0; i < boardSize; i++) {
            for (int j = 0; j < boardSize; j++) {
                this.board[i][j] = new Tile();
            }
        }

        this.players = new Player[2];
        this.players[0] = new Player();
        this.players[1] = new Player();
        this.currentPlayer = 0;
    }

    public Tile getTile(int row, int column) throws IndexOutOfBoundsException {
        return this.board[row][column];
    }

   
    public int getCurrentPlayerIndex() {
        return this.currentPlayer;
    }

    public Player getCurrentPlayer() {
        return this.players[this.currentPlayer];
    }

    public void endTurn() {
        currentPlayer = (currentPlayer + 1) % 2;
    }


    public boolean isOver() {
        return this.players[0].getScore() + this.players[1].getScore() == this.board.length * this.board.length;
    }

    public int getWinner() {
        return this.players[0].getScore() > this.players[1].getScore() ? 0 : 1;
    }

    public ArrayList<int[]> tipTiles(int row, int column) {
    ArrayList<int[]> tileCoordinates = new ArrayList<>();

    int[][] directions = { { 0, 0 }, { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } }; 

    for (int[] dir : directions) {
        int newRow = row + dir[0];
        int newColumn = column + dir[1];

        if (isValidPosition(newRow, newColumn)) {
            boolean tipped = board[newRow][newColumn].tipTile(getCurrentPlayer());
            int tipResult = tipped ? 1 : 0;
            tileCoordinates.add(new int[] { newRow, newColumn, tipResult });
        }
    }

    return tileCoordinates;
}


    private boolean isValidPosition(int row, int column) {
        return row >= 0 && row < board.length && column >= 0 && column < board.length;
    }


}