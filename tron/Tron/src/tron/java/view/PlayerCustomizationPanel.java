package tron.java.view;

import javax.swing.*;
import java.awt.*;

public class PlayerCustomizationPanel extends JPanel {
    private final JTextField playerNameInput;

    private final JLabel playerColorLabel;

    private static short playerNumber = 1;

    public PlayerCustomizationPanel(Color defaultColor, ImageIcon controls) {
        this.setPreferredSize(new Dimension(150, 350));

        JLabel playerNumberLabel = new JLabel("Játékos #" + PlayerCustomizationPanel.playerNumber);
        playerNumberLabel.setFont(playerNumberLabel.getFont().deriveFont(24f));
        this.add(playerNumberLabel);

        JLabel nameLabel = new JLabel("Név", SwingConstants.CENTER);
        nameLabel.setFont(nameLabel.getFont().deriveFont(16f));
        this.add(nameLabel);

        this.playerNameInput = new JTextField("P" + PlayerCustomizationPanel.playerNumber);
        this.playerNameInput.setPreferredSize(new Dimension(125, 20));
        this.add(this.playerNameInput);

        JLabel colorLabel = new JLabel("Szín", SwingConstants.CENTER);
        colorLabel.setPreferredSize(new Dimension(150,18));
        colorLabel.setFont(colorLabel.getFont().deriveFont(16f));
        this.add(colorLabel);

        this.playerColorLabel = new JLabel();
        this.playerColorLabel.setOpaque(true);
        this.playerColorLabel.setPreferredSize(new Dimension(75,75));
        this.playerColorLabel.setBackground(defaultColor);
        this.add(this.playerColorLabel);

        JButton playerColorPickerButton = new JButton("Kiválaszt");
        playerColorPickerButton.setPreferredSize(new Dimension(100,20));
        this.add(playerColorPickerButton);
        playerColorPickerButton.addActionListener(e -> playerColorLabel.setBackground(JColorChooser.showDialog(null,"Válaszd ki a színt.", playerColorLabel.getBackground())));

        JLabel controlLabel = new JLabel(controls);
        this.add(controlLabel);

        PlayerCustomizationPanel.playerNumber++;
    }

    public String getPlayerName() {
        return playerNameInput.getText();
    }

    public Color getPlayerColor() {
        return playerColorLabel.getBackground();
    }
}