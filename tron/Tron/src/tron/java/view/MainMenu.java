package tron.java.view;

import javax.swing.*;
import java.awt.*;
import java.util.Objects;
public class MainMenu extends JPanel {
    private final PlayerCustomizationPanel player1Panel;

    private final PlayerCustomizationPanel player2Panel;

    private final JTextField horizontalSizeInput;

    private final JTextField verticalSizeInput;

    private final GameView parent;

    public MainMenu(GameView parent) {
        this.parent = parent;
        this.setLayout(new BorderLayout());
        this.setPreferredSize(this.parent.FRAME_DIMENSION);

        JLabel title = new JLabel("TRON", SwingConstants.CENTER);
        title.setPreferredSize(new Dimension(150,38));
        title.setFont(title.getFont().deriveFont(38f));
        this.add(title, BorderLayout.NORTH);

        this.player1Panel = new PlayerCustomizationPanel(Color.BLUE, new ImageIcon(Objects.requireNonNull(getClass().getResource("../../resources/controls1.png"))));
        this.add(player1Panel, BorderLayout.WEST);

        this.player2Panel = new PlayerCustomizationPanel(Color.RED, new ImageIcon(Objects.requireNonNull(getClass().getResource("../../resources/controls2.png"))));
        this.add(player2Panel, BorderLayout.EAST);

        JPanel navigationMenu = new JPanel();

        Dimension inputSize = new Dimension(25, 25);
        JLabel mapSizeLabel = new JLabel("Pályaméret:");

        this.horizontalSizeInput = new JTextField("17");
        this.horizontalSizeInput.setPreferredSize(inputSize);

        this.verticalSizeInput = new JTextField("17");
        this.verticalSizeInput.setPreferredSize(inputSize);

        navigationMenu.add(mapSizeLabel);
        navigationMenu.add(horizontalSizeInput);
        navigationMenu.add(new JLabel("x")); 
        navigationMenu.add(verticalSizeInput);

        Dimension buttonDimension = new Dimension(150,40);

        JButton startButton = new JButton("Játék indítása");
        startButton.setPreferredSize(buttonDimension);
        startButton.addActionListener(e -> {
            this.parent.newGame(this.player1Panel.getPlayerName(),  this.player1Panel.getPlayerColor(),
                                this.player2Panel.getPlayerName(),  this.player2Panel.getPlayerColor(),
                                this.horizontalSizeInput.getText(), this.verticalSizeInput.getText()   );
        });

        JButton scoreButton = new JButton("Eredmények");
        scoreButton.setPreferredSize(buttonDimension);
        scoreButton.addActionListener(e -> {
            CardLayout cardLayout = (CardLayout) (this.parent.getContentPane().getLayout());
            cardLayout.show(this.parent.getContentPane(), "Score menu");
            this.parent.requestScores();
        });

        JButton exitButton = new JButton("Kilépés");
        exitButton.setPreferredSize(buttonDimension);
        exitButton.addActionListener(e -> System.exit(0));

        navigationMenu.add(startButton);
        navigationMenu.add(scoreButton);
        navigationMenu.add(exitButton);

        this.add(navigationMenu, BorderLayout.CENTER);
    }
}