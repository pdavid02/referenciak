package tron.java.view;

import javax.swing.*;
import java.awt.*;
import java.util.Objects;


public class GameView extends JFrame {

    public final Dimension FRAME_DIMENSION  = new Dimension(500, 400);

    private final MainMenu mainMenu;

    private final GameMenu gameMenu;

    private final HighScoreMenu highScoreMenu;

    public GameView() {
        this.setTitle("Tron");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(this.FRAME_DIMENSION);
        this.setResizable(false);
        this.setIconImage(new ImageIcon(Objects.requireNonNull(getClass().getResource("../../resources/helmet.png"))).getImage());
        this.getContentPane().setLayout(new CardLayout());

        this.mainMenu = new MainMenu(this);
        this.gameMenu = new GameMenu(this);
        this.highScoreMenu = new HighScoreMenu(this);

        this.getContentPane().add(mainMenu,"Main menu" );
        this.getContentPane().add(this.gameMenu,"Game"      );
        this.getContentPane().add(this.highScoreMenu,"Score menu");

        this.setVisible(true);
    }

    public void returnToMenu() {
        ((CardLayout) (this.getContentPane().getLayout())).show(this.getContentPane(), "Main menu");
        this.setSize(this.FRAME_DIMENSION);
    }

    public void newGame(String player1Name, Color player1Color, String player2Name, Color player2Color, String horizontalSizeRaw, String verticalSizeRaw) {
        try {
            player1Name = player1Name.trim();
            player2Name = player2Name.trim();
            int horizontalSize = Integer.parseInt(horizontalSizeRaw);
            int verticalSize   = Integer.parseInt(verticalSizeRaw);

            this.gameMenu.newGame(player1Name, player1Color, player2Name, player2Color, horizontalSize, verticalSize);

        } catch (NumberFormatException exception) {
            JOptionPane.showMessageDialog(this, "Érvénytelen pályaméret!", "Hiba", JOptionPane.ERROR_MESSAGE);
        } catch (IllegalArgumentException exception) {
            JOptionPane.showMessageDialog(this, exception.getMessage(), "Hiba", JOptionPane.ERROR_MESSAGE);
        }
    }

    public void requestScores() {
        this.highScoreMenu.updateTable();
    }
}