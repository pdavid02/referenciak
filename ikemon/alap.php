<?php
session_start();
require_once 'cardFunctions.php';

function getUsersFromFile() {
    $usersFile = file_get_contents('users.json');
    if ($usersFile === false) {
        // Hiba a fájl beolvasása során
        return false;
    }

    $users = json_decode($usersFile);
    if ($users === null) {
        // Hiba a JSON dekódolás során
        return false;
    }

    return $users;
}

// Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];
}

// Ellenőrizzük, hogy az oldal betöltésekor volt-e POST kérés a kártya eladására
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sellCard'])) {
    if(isset($_POST['cardId'])){
        $cardId = $_POST['cardId']; // Azonosító továbbítása a POST kérés során

    // Ellenőrizze, hogy a kártya létezik-e a felhasználónál
    if (isset($user->cards[$cardId])) {
        $card = $user->cards[$cardId];

        $sellPrice = round($card['price'] * 0.9);

        unset($user->cards[$cardId]);
            
            
        $user->money += $sellPrice;

        $users = getUsersFromFile();
        if ($users !== false) {
            foreach ($users as $username => &$userInfo) {
                if ($userInfo->username == $user->username) {
                    $userInfo->money += $sellPrice;
                    $userInfo->cards = $user->cards;
                }
                file_put_contents('users.json', json_encode($users));
            }

            addCardToAdmin($card);

            $_SESSION['user'] = $user;

            header('Location: user_details.php');
            exit();
        } else {
            echo "Hiba történt a fájlkezelés során.";
        }
    }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Felhasználó részletek</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
<h1>Felhasználó részletek</h1>

<h2>Felhasználó adatai</h2>
<p>Felhasználónév: <?php echo $user->username; ?></p>
<p>Email: <?php echo $user->email; ?></p>
<p>Pénz: <?php echo $user->money; ?></p>

<h2>Saját kártyái</h2>
<ul>
<?php foreach ($user->cards as $card): ?>
    <li>
        <?php echo $card['name']; ?> -
        Ár: <?php echo $card['price']; ?> -
        <form method="post">
            <input type="hidden" name="card" value="<?php echo htmlspecialchars(json_encode($card)); ?>">
            <button type="submit" name="sellCard">Kártya eladása az adminnak</button>
        </form>
    </li>
<?php endforeach; ?>
</ul>



</body>
</html>

</body>
</html>



