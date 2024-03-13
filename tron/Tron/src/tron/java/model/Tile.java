package tron.java.model;

import java.awt.*;

public class Tile {
    
    public static final Color SAFE_COLOR = new Color(41, 53, 66);

    
    private Color color;

    
    public Tile() {
        this.color = Tile.SAFE_COLOR;
    }

 
    public Tile(Color color) {
        this.color = color;
    }

    public Color getColor() {
        return color;
    }

   
    public void setColor(Color color) {
        this.color = color;
    }

    public boolean isSafe() {
        return this.color.equals(SAFE_COLOR);
    }
}