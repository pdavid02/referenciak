package tron.java.database;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.*;
import java.util.ArrayList;

public class HighScores {

    private static HighScores instance;

    private final Connection connection;

    
    private HighScores() throws SQLException {
        this.connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/progtech", "neptun", "mypassword");
    }

    public static HighScores instance() throws SQLException{
        if (HighScores.instance == null) {
            HighScores.instance = new HighScores();
        }
        return instance;
    }

  
    public void insertScore(String playerName) throws SQLException {

        PreparedStatement selectPlayerID = this.connection.prepareStatement("SELECT id FROM highscores WHERE name = ?");
        selectPlayerID.setString(1, playerName);

        ResultSet resultSet = selectPlayerID.executeQuery();

   
        if (resultSet.next()) {
         
            int id = resultSet.getInt(1);
            PreparedStatement updateRecord = this.connection.prepareStatement("UPDATE highscores SET score = score + 1 WHERE id = ?");
            updateRecord.setInt(1, id);
            updateRecord.executeUpdate();
        } else {
        
            PreparedStatement insertRecord = this.connection.prepareStatement("INSERT INTO highscores (name, score) VALUES (?, 1)");
            insertRecord.setString(1, playerName);
            insertRecord.executeUpdate();
        }
    }

 
    public ArrayList<HighScore> getTopScores() throws SQLException {
        ArrayList<HighScore> topScores = new ArrayList<>();

    
        PreparedStatement selectTop = this.connection.prepareStatement("SELECT name, score FROM highscores ORDER BY score DESC LIMIT 10 ");
        ResultSet resultSet = selectTop.executeQuery();

        while (resultSet.next()) {
            topScores.add(new HighScore(resultSet.getString(1), resultSet.getInt(2)));
        }

        return topScores;
    }
}