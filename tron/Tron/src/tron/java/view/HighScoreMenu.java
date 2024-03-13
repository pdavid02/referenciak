package tron.java.view;

import tron.java.database.HighScore;
import tron.java.database.HighScores;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.SQLException;
import java.util.ArrayList;

public class HighScoreMenu extends JPanel {
    private final DefaultTableModel tableModel;

    private final GameView parent;

    public HighScoreMenu(GameView parent)  {
        this.parent = parent;

        this.setLayout(new BorderLayout());
        this.setPreferredSize(this.parent.FRAME_DIMENSION);

        JLabel header  = new JLabel("Legjobb eredmények", SwingConstants.CENTER);
        header.setFont(header.getFont().deriveFont(30f));
        this.add(header, BorderLayout.NORTH);

        this.tableModel = new DefaultTableModel(new String[]{"Név", "Pont"}, 0);

        JTable highScoreTable = new JTable(this.tableModel);
        highScoreTable.setDefaultEditor(Object.class, null);
        this.add(new JScrollPane(highScoreTable), BorderLayout.CENTER);

        JButton backButton = new JButton("Vissza");
        backButton.addActionListener(e -> this.parent.returnToMenu());
        this.add(backButton, BorderLayout.SOUTH);
    }

    public void updateTable() {
        tableModel.setRowCount(0);
        try {
            ArrayList<HighScore> data = HighScores.instance().getTopScores();

            for (HighScore highScore : data) {
                Object[] row = {highScore.name(), highScore.score()};
                this.tableModel.addRow(row);
            }
        } catch (SQLException exception) {
            JOptionPane.showMessageDialog(this, "Adatbázis hiba történt! A keresett adatbázis nem elérhető vagy nem létezik.", "Hiba", JOptionPane.ERROR_MESSAGE);
            this.parent.returnToMenu();
        }
    }
}