package tron.java.view;

import tron.java.model.Direction;
import tron.java.model.GameModel;
import tron.java.model.GameState;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.sql.SQLException;
import java.util.Objects;


public class GameMenu extends JPanel {

    private final int TILE_SIZE = 40;

    private final Timer timer;

    private int time;

    private final JLabel timeLabel;

    private JLabel[][] gameArea;

    private GameModel game;

    private final ImageIcon motorSprite;

    private final ImageIcon deathSprite;


    private final GameView parent;

    public GameMenu(GameView parent) {
        this.parent = parent;

        ImageIcon motorIcon = new ImageIcon(Objects.requireNonNull(getClass().getResource("../../resources/helmet.png")));
        this.motorSprite    = new ImageIcon(motorIcon.getImage().getScaledInstance(this.TILE_SIZE - 5, this.TILE_SIZE - 5,  java.awt.Image.SCALE_SMOOTH));

        ImageIcon deathIcon = new ImageIcon(Objects.requireNonNull(getClass().getResource("../../resources/dead.png")));
        this.deathSprite    = new ImageIcon(deathIcon.getImage().getScaledInstance(this.TILE_SIZE - 5, this.TILE_SIZE - 5,  java.awt.Image.SCALE_SMOOTH));

        this.getInputMap().put(KeyStroke.getKeyStroke("W"), "Player1 Up");
        this.getActionMap().put("Player1 Up", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.UP,0);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("D"), "Player1 Right");
        this.getActionMap().put("Player1 Right", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.RIGHT,0);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("S"), "Player1 Down");
        this.getActionMap().put("Player1 Down", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.DOWN,0);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("A"), "Player1 Left");
        this.getActionMap().put("Player1 Left", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.LEFT,0);}
        });


        this.getInputMap().put(KeyStroke.getKeyStroke("UP"), "Player2 Up");
        this.getActionMap().put("Player2 Up", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.UP,1);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("RIGHT"), "Player2 Right");
        this.getActionMap().put("Player2 Right", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.RIGHT,1);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("DOWN"), "Player2 Down");
        this.getActionMap().put("Player2 Down", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.DOWN,1);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("LEFT"), "Player2 Left");
        this.getActionMap().put("Player2 Left", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { game.setPlayerDirection(Direction.LEFT,1);}
        });

        this.getInputMap().put(KeyStroke.getKeyStroke("ESCAPE"), "Return to menu");
        this.getActionMap().put("Return to menu", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) { exitGame(); }
        });

        this.setLayout(new BorderLayout());

        this.time = 0;
        this.timer = new Timer(1000, new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    if (game != null) {
                        updateLabel();
                        clearPlayerIcon();

                        GameState gameState = game.doRound();
                        paintPlayerLocation();

                        if (gameState != GameState.IN_PROGRESS) {
                            timer.stop();
                            String gameEndMessage = "";
                            switch (gameState) {
                                case DRAW -> {
                                    gameEndMessage = "Döntetlen.";
                                    paintDeadIcon(0);
                                }
                                case PLAYER1WON -> {
                                    gameEndMessage = game.getPlayerName(0) + " nyert.";
                                    paintDeadIcon(1);
                                }
                                case PLAYER2WON -> {
                                    gameEndMessage = game.getPlayerName(1) + " nyert.";
                                    paintDeadIcon(0); 
                                }
                            }
                            JOptionPane.showMessageDialog(GameMenu.this, gameEndMessage, "Játék vége", JOptionPane.INFORMATION_MESSAGE);

                            exitGame();
                        }
                    }
                } catch (SQLException exception) {
                JOptionPane.showMessageDialog(GameMenu.this, "Adatbázis hiba történt! A keresett adatbázis nem elérhető vagy nem létezik.", "Hiba", JOptionPane.ERROR_MESSAGE);
                GameMenu.this.exitGame();
                }
            }
        });

        this.timeLabel = new JLabel("00:00", SwingConstants.CENTER);
        this.timeLabel.setFont(this.timeLabel.getFont().deriveFont(25f));
        this.add(this.timeLabel, BorderLayout.NORTH);

        this.add(new JLabel("ESC - kilépés", SwingConstants.CENTER), BorderLayout.SOUTH);
    }

    public void newGame(String player1Name, Color player1Color, String player2Name, Color player2Color, int horizontalSize, int verticalSize) throws IllegalArgumentException {
        this.game = new GameModel(player1Name, player1Color, player2Name, player2Color, horizontalSize, verticalSize);


        CardLayout cardLayout = (CardLayout) (this.parent.getContentPane().getLayout());
        cardLayout.show(this.parent.getContentPane(), "Game");

        this.requestFocus(); 

        this.drawMap();

 
        this.timer.restart();

        this.timeLabel.setPreferredSize(new Dimension(horizontalSize * this.TILE_SIZE, 50));
    }

    private void exitGame() {
 
        this.game = null;

    
        this.timer.stop();
        this.time = 0;
        this.timeLabel.setText("00:00");

        this.remove(((BorderLayout) this.getLayout()).getLayoutComponent(BorderLayout.CENTER));

        this.parent.returnToMenu();
    }

    private void drawMap() {
        int horizontalSize = this.game.getHorizontalSize();
        int verticalSize = this.game.getVerticalSize();
        Dimension gamePanelDimension = new Dimension(horizontalSize * this.TILE_SIZE, verticalSize * this.TILE_SIZE + 100);

        this.setPreferredSize(gamePanelDimension);
        this.parent.setSize(gamePanelDimension);

        JPanel gameAreaPanel = new JPanel();
        gameAreaPanel.setLayout(new GridLayout(verticalSize, horizontalSize));
        gameAreaPanel.setPreferredSize(new Dimension(horizontalSize * this.TILE_SIZE, verticalSize * this.TILE_SIZE));

        this.add(gameAreaPanel, BorderLayout.CENTER);

        this.gameArea = new JLabel[verticalSize][horizontalSize];

        for (int row = 0; row < verticalSize; row++) {
            for (int column = 0; column < horizontalSize; column++) {
                JLabel tile = new JLabel();
                tile.setOpaque(true);

                tile.setPreferredSize(new Dimension(this.TILE_SIZE, this.TILE_SIZE));

                tile.setBackground(this.game.getColor(row,column));
                tile.setBorder(BorderFactory.createLineBorder(new Color(144,221,231), 1));

                gameAreaPanel.add(tile);
                this.gameArea[row][column] = tile;
            }
        }
        paintPlayerLocation();
    }

    private void paintPlayerLocation() {
        JLabel player1Location = gameArea[game.getVerticalPlayerLocation(0)][game.getHorizontalPlayerLocation(0)];
        JLabel player2Location = gameArea[game.getVerticalPlayerLocation(1)][game.getHorizontalPlayerLocation(1)];

        player1Location.setBackground(this.game.getPlayerColor(0));
        player2Location.setBackground(this.game.getPlayerColor(1));

        player1Location.setIcon(motorSprite);
        player2Location.setIcon(motorSprite);
    }

    private void clearPlayerIcon() {
        this.gameArea[game.getVerticalPlayerLocation(0)][game.getHorizontalPlayerLocation(0)].setIcon(null);
        this.gameArea[game.getVerticalPlayerLocation(1)][game.getHorizontalPlayerLocation(1)].setIcon(null);
    }

    private void paintDeadIcon(int player) {
        this.gameArea[game.getVerticalPlayerLocation(player)][game.getHorizontalPlayerLocation(player)].setIcon(this.deathSprite);
    }

    private void updateLabel() {
        this.time++;

        int seconds = this.time % 60;
        int minutes = this.time / 60;

        StringBuilder stringBuilder = new StringBuilder();

        if (minutes < 10) {
            stringBuilder.append(0);
        }

        stringBuilder.append(minutes);
        stringBuilder.append(':');

        if (seconds < 10) {
            stringBuilder.append(0);
        }

        stringBuilder.append(seconds);

        this.timeLabel.setText(stringBuilder.toString());
    }
}