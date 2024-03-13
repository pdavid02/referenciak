package tron.java.model;

import tron.java.database.HighScores;

import java.awt.Color;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;

public class GameModel {
 
    private final Tile[][] palya;

   
    private final Player[] jatekosok;

    private int getRandom(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

 
    private void generateObstacleCluster(int centerX, int centerY) {
        ArrayList<int[]> obstacleCluster = new ArrayList<>();
        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                obstacleCluster.add(new int[]{centerX + i, centerY + j});
            }
        }
        Collections.shuffle(obstacleCluster);

        for (int[] coordinate : obstacleCluster.stream().limit(getRandom(3, 10)).toList()) {
            this.palya[coordinate[0]][coordinate[1]].setColor(Color.BLACK);
            this.palya[this.getVerticalSize() - 1 - coordinate[0]][this.getHorizontalSize() - 1 - coordinate[1]].setColor(Color.BLACK);
        }

        for (int i = 0; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                this.palya[jatekosok[0].getVerticalLocation() + j][jatekosok[0].getHorizontalLocation() + i].setColor(Tile.SAFE_COLOR);
            }
        }
    }


    public GameModel(String player1Name, Color player1Color, String player2Name, Color player2Color,  int horizontalSize, int verticalSize) throws IllegalArgumentException {
        StringBuilder errorMessage = new StringBuilder();

        if (player1Name.trim().length() == 0 || player2Name.trim().length() == 0) {
            errorMessage.append("A játékosok neve nem lehet üres!\n");
        }

        if (Objects.equals(player1Name.trim(), player2Name.trim())) {
            errorMessage.append("A játékosok neveinek egyedinek kell lennie!\n");
        }

    
        if (Objects.equals(player1Color, player2Color)) {
            errorMessage.append("A játékosok színeinek egyedinek kell lennie!\n");
        }

   
        if (player1Color.equals(Tile.SAFE_COLOR) || player2Color.equals(Tile.SAFE_COLOR)) {
            errorMessage.append("Az RGB(41, 53, 66) a játék pályájának színe.");
        }


        if (horizontalSize < 7 || verticalSize < 7) {
            errorMessage.append("A pálya mérete nem lehet kisebb 7-nél!\n");
        }

    
        if (horizontalSize % 2 == 0 || verticalSize % 2 == 0) {
            errorMessage.append("A pálya mérete nem lehet páros.\n");
        }

    
        if (errorMessage.length() != 0) {
            throw new IllegalArgumentException(errorMessage.toString());
        }

   
        verticalSize   += 2;
        horizontalSize += 2;


        this.jatekosok = new Player[2];

        int verticalStart = verticalSize / 2;

        int player1HorizontalStart = 1;
        this.jatekosok[0] = new Player(player1Name, player1Color, player1HorizontalStart, verticalStart, Direction.RIGHT);

        int player2HorizontalStart = horizontalSize-2;
        this.jatekosok[1] = new Player(player2Name, player2Color, player2HorizontalStart , verticalStart, Direction.LEFT);

   
        this.palya = new Tile[verticalSize][horizontalSize];

        for (int row = 0; row < verticalSize; row++) {
            for (int column = 0; column < horizontalSize; column++) {
                if (row == 0 || column == 0 || column == horizontalSize - 1 || row == verticalSize - 1 ) {
                    this.palya[row][column] = new Tile(Color.BLACK);
                } else {
                    this.palya[row][column] = new Tile();
                }
            }
        }

        int x1 = getRandom(1, horizontalSize / 2 + 1);
        int y1 = getRandom(1, verticalSize / 2 + 1);

        generateObstacleCluster(x1,y1);

        int x2 = getRandom(horizontalSize / 2 + 1, horizontalSize - 1);
        int y2 = getRandom(1, verticalSize / 2 + 1);

        generateObstacleCluster(x2,y2);

        
        for (int i = -1; i <= 0; i++) {
            for (int j = -1; j <= 1; j++) {
                this.palya[jatekosok[1].getVerticalLocation() + j][jatekosok[1].getHorizontalLocation() + i].setColor(Tile.SAFE_COLOR);
            }
        }

        
        this.palya[verticalStart][player1HorizontalStart].setColor(this.jatekosok[0].getColor());
        this.palya[verticalStart][player2HorizontalStart].setColor(this.jatekosok[1].getColor());
    }


    public GameState doRound() throws SQLException {
        for (int i = 0; i < this.jatekosok.length; ++i) {
            Player player = this.jatekosok[i];

            player.move();

            Tile playerLocation = this.palya[player.getVerticalLocation()][player.getHorizontalLocation()];

            if (jatekosok[0].getHorizontalLocation() == jatekosok[1].getHorizontalLocation() && jatekosok[0].getVerticalLocation() == jatekosok[1].getVerticalLocation()) {
                return GameState.DRAW;
            }

            if (!playerLocation.isSafe()) {
                if (i == 0) {
                    HighScores.instance().insertScore(jatekosok[1].getName());
                    return GameState.PLAYER2WON;
                } else {
                    HighScores.instance().insertScore(jatekosok[0].getName());
                    return GameState.PLAYER1WON;
                }
            } else {
                playerLocation.setColor(player.getColor());
            }
        }
        return GameState.IN_PROGRESS;
    }

 
    public String getPlayerName(int playerIndex) {
        return this.jatekosok[playerIndex].getName();
    }

 
    public Color getPlayerColor(int playerIndex) {
        return this.jatekosok[playerIndex].getColor();
    }

  
    public int getHorizontalPlayerLocation(int playerIndex) {
        return this.jatekosok[playerIndex].getHorizontalLocation();
    }

  
    public int getVerticalPlayerLocation(int playerIndex) {
        return this.jatekosok[playerIndex].getVerticalLocation();
    }

   
    public void setPlayerDirection(Direction direction, int playerIndex) {
        this.jatekosok[playerIndex].setDirection(direction);
    }

   
    public int getHorizontalSize() {
    
        return this.palya[0].length;
    }

   
    public int getVerticalSize() {
        return this.palya.length;
    }

    public Color getColor(int row, int column) {
        return this.palya[row][column].getColor();
    }
}