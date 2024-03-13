/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package progtechbead2;

/**
 *
 * @author peter
 */
public class Tile {
    private int tipCount;

    public Tile() {
        this.tipCount = 0;
    }

    public boolean tipTile(Player player) {
        if (this.tipCount < 4) {
            this.tipCount++;
            if (this.tipCount == 4) {
                player.scorePlus();
                return true;
            }
        }
        return false;
    }

    public int getTipCount() {
        return tipCount;
    }
}
