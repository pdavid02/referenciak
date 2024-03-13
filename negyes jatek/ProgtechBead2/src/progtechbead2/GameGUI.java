/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package progtechbead2;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import javax.swing.*;


/**
 *
 * @author peter
 */
public class GameGUI {
    private final JFrame jframe;
    
    private JButton[][] jboard;


    private JLabel label;
    private JLabel[] pont;
    private GameModel model;
   
   
   public GameGUI(){
       this.jframe = new JFrame("4x4-es jatek");
       this.jframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
       this.jframe.setResizable(false);
       this.jframe.setPreferredSize(new Dimension(350,200));
       this.jframe.setLayout(new BorderLayout());
       
       JMenuBar menuBar = new JMenuBar();
        this.jframe.setJMenuBar(menuBar);
        
        JMenu gameMenu = new JMenu("Uj jatek");
        menuBar.add(gameMenu);
        
        for (int boardSize : new int[]{3, 5, 7}) {
            JMenuItem sizeMenuItem = new JMenuItem(boardSize + "x" + boardSize);
            gameMenu.add(sizeMenuItem);
            sizeMenuItem.addActionListener(e -> {
                this.jframe.getContentPane().removeAll();
                setUp(boardSize);
                this.jframe.pack();
            });
        }

        this.jframe.pack();
        this.jframe.setVisible(true);
        
   }
   
   private void reset() {
        this.jframe.getContentPane().removeAll();
        setUp(jboard.length);
        this.jframe.pack();
    }
   
private void createTurnDisplay() {
    label = new JLabel("Egyes jatekos kore");
    JPanel turnPanel = new JPanel();
    turnPanel.add(label);
    jframe.add(turnPanel, BorderLayout.NORTH);
}

private void createPontPanels(int boardSize, int size) {
    pont = new JLabel[2];
    String[] playerLabels = { "Egyes jatekos pontszama:", "Kettes játékos pontszáma:" };

    for (int player = 0; player < 2; player++) {
        JPanel pontPanel = new JPanel();
        pontPanel.setPreferredSize(new Dimension(160, boardSize * size));
        pont[player] = new JLabel("0");
        pontPanel.add(new JLabel(playerLabels[player]));
        pontPanel.add(pont[player]);
        jframe.add(pontPanel, player == 0 ? BorderLayout.WEST : BorderLayout.EAST);
    }
}

private void createBoard(int boardSize, int size) {
    JPanel boardPanel = new JPanel();
    boardPanel.setLayout(new GridLayout(boardSize, boardSize));

    jboard = new JButton[boardSize][boardSize];
    model = new GameModel(boardSize);

    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardSize; j++) {
            JButton button = new JButton();
            button.setBackground(Color.lightGray);
            button.addActionListener(new ButtonListener(i, j));
            button.setPreferredSize(new Dimension(size, size));
            button.setText(String.valueOf(model.getTile(i, j).getTipCount()));
            jboard[i][j] = button;
            boardPanel.add(button);
        }
    }

    jframe.add(boardPanel, BorderLayout.CENTER);
    jframe.setPreferredSize(new Dimension(boardSize * size + 300, boardSize * size + 50));
}

    private void setUp(int boardSize) {
    int size = 80;

    createTurnDisplay();
    createPontPanels(boardSize,size);
    createBoard(boardSize,size);
    }
    
    class ButtonListener implements ActionListener {
    private final int row;
    private final int column;

    public ButtonListener(int row, int column) {
        this.row = row;
        this.column = column;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        handleTileClick();
    }

    private void handleTileClick() {
        int currentPlayerIndex = model.getCurrentPlayerIndex();
        Player player = model.getCurrentPlayer();
        ArrayList<int[]> tipped = model.tipTiles(row, column);

        for (int[] tile : tipped) {
            int x = tile[0];
            int y = tile[1];

            if (tile[2] == 1) {
                handleTippedTile(x, y, currentPlayerIndex, player);
            }

            updateTileDisplay(x, y);
        }

        updateTurnLabel(currentPlayerIndex);
        model.endTurn();

        if (model.isOver()) {
            showGameResult();
            reset();
        }
    }

    private void handleTippedTile(int x, int y, int currentPlayerIndex, Player player) {
        jboard[x][y].setBackground(currentPlayerIndex == 0 ? Color.GREEN : Color.RED);
        jboard[x][y].removeActionListener(this);
        pont[currentPlayerIndex].setText(String.valueOf(player.getScore()));
        jboard[x][y].setEnabled(false);
    }

    private void updateTileDisplay(int x, int y) {
        jboard[x][y].setText(String.valueOf(model.getTile(x, y).getTipCount()));
    }

    private void updateTurnLabel(int currentPlayerIndex) {
        label.setText(currentPlayerIndex == 0 ? "Kettes jatekos kore" : "Egyes jatekos kore");
    }

    private void showGameResult() {
        String winnerMessage = model.getWinner() == 0 ? "A jatekot az egyes jatekos nyerte." : "A jatekot a kettes jatekos nyerte.";
        JOptionPane.showMessageDialog(jframe, winnerMessage, "Jatek vege.", JOptionPane.INFORMATION_MESSAGE);
        }
  }

    
    
}



