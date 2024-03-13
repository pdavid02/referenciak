<?php 
require_once "auth.php";
include_once 'cardFunctions.php';
session_start();
$auth = new Auth();

function getFilteredCards() {
    $typeFilter = isset($_GET['typeFilter']) ? $_GET['typeFilter'] : '';

    $cards = getCards();
    $filteredCards = array();

    foreach ($cards as $cardId => $card) {
        if ($typeFilter === '' || $card['type'] === $typeFilter) {
            $filteredCards[$cardId] = $card;
        }
    }

    return $filteredCards;
}
?>


<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Home</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
</head>

<body>
<header>
    <h1 class="left"><a href="index.php">IKémon</a> > Home</h1>
    <?php if(isset($_SESSION['user']) == false): ?>
        <h1 class="right">
            <a href="login.php">Login</a> / <a href="register.php">Register</a>
        </h1>
    <?php else: ?>
        <?php if (isset($_SESSION['user'])): ?>
            <?php 
            $loggedUser = $_SESSION['user']; ?>
            <h1 class="right" id="logged">
                Bejelentkezett felhasználó: <a href="user_details.php"><?= $loggedUser->username ?></a> |
                <a href="logout.php">Kijelentkezés</a><br>
                💰 <?= $loggedUser->money ?>

                <?php if($loggedUser->username == "admin"): ?>
                    <p><a href="admin.php">Kártya létrehozása</a></p>
                <?php endif; ?>
            </h1>
        <?php endif; ?>
    <?php endif; ?>
</header>


    <div class="content">
    <div id="filter">
            <form action="index.php" method="get">
                <label for="typeFilter">Szűrés típus szerint:</label>
                <select name="typeFilter" id="typeFilter">
                    <option value="">Mind</option>
                    <option value="normal">Normal</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="electric">Electric</option>
                    <option value="grass">Grass</option>
                    <option value="ice">Ice</option>
                    <option value="fighting">Fighting</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="psychic">Psychic</option>
                    <option value="bug">Bug</option>
                    <option value="rock">Rock</option>
                    <option value="ghost">Ghost</option>
                    <option value="dark">Dark</option>
                    <option value="steel">Steel</option>
                </select>
                <button type="submit">Szűrés</button>
            </form>
        </div>
        <?php
         
        if(isset($_GET['variable'])){
            $variable = $_GET['variable'];
            echo "<script type='text/javascript'>alert('$variable');</script>";
        }
        ?>

        <div class="card-list">
            <?php
            $cards = getFilteredCards();
            foreach ($cards as $cardId => $card) {
                echo '<div class="pokemon-card">';
                echo '<div class="image clr-' . $card['type'] . '">';
                echo '<img src="' . $card['image'] . '" alt="'.$card['name'].'">';
                echo '</div>';
                echo '<div class="details">';
                echo '<h2><a href="details.php?id=' . $cardId . '">' . $card['name'] . '</a></h2>';
                echo '<span class="card-type"><span class="icon">🏷</span> ' . $card['type'] . '</span>';
                echo '<span class="attributes">';
                echo '<span class="card-hp"><span class="icon">❤</span> ' . $card['hp'] . '</span>';
                echo '<span class="card-attack"><span class="icon">⚔</span> ' . $card['attack'] . '</span>';
                echo '<span class="card-defense"><span class="icon">🛡</span> ' . $card['defense'] . '</span>';
                echo '</span>';
                echo '</div>';
                echo '<a href="buy_card.php?id=' . $cardId . '" class="buyButton">';
                echo '<div class="buy">';
                echo '<span class="card-price"><span class="icon">💰</span> ' . $card['price'] . '</span>';
                echo '</div>';
                echo '</a>';
                echo '</div>';
                echo '</a>';
            }
            ?>
        </div>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>