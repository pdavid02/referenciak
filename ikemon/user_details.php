<?php
session_start();
require_once 'cardFunctions.php';

function getUsersFromFile() {
    $usersFile = file_get_contents('users.json');
    if ($usersFile === false) {
        return false;
    }

    $users = json_decode($usersFile, true);
    if ($users === null) {
        return false;
    }

    return $users;
}


if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sellCard']) && $user->username !="admin") {
    if (isset($_POST['cardId'])) {
        $cardId = $_POST['cardId'];

        if (isset($user->cards[$cardId])) {
            $card = $user->cards[$cardId];
            $sellPrice = round($card->price * 0.9);

            unset($user->cards[$cardId]);
            $user->money += $sellPrice;

            $users = getUsersFromFile();
            
            foreach ($users as &$userInfo) {
                if ($userInfo['username'] == $user->username) {
                    $userInfo['money'] += $sellPrice;
                    $userInfo['cards'] = $user->cards;
                }

                
            }
            file_put_contents('users.json', json_encode($users));

            addCardToAdmin($card);

                $_SESSION['user'] = $user;

                header('Location: user_details.php');
                exit();
            } else {
                echo "Hiba történt a fájlkezelés során.";
            }
        }
    }
    //var_dump($user->cards);

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Felhasználó részletek</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
</head>
<body>

<header>
    <h1 class="left"><a href="index.php">IKémon</a> > Felhasználó részletek</h1>
</header>

<div id="datas">
    <h1>Felhasználó adatai</h1>
    <p>Felhasználónév: <?php echo $user->username; ?></p>
    <p>Email: <?php echo $user->email; ?></p>
    <p>💰 <?php echo $user->money; ?></p>
</div>
<div class="content">

    <h2>Saját kártyái</h2>
<div class="card-list">
    
    <?php foreach ($user->cards as $cardId => $card): ?>
    <div class="pokemon-card">
    <div class="image clr-<?php echo $card->type;?>">
                <img src="<?php echo $card->image;?>" alt="<?php echo $card->name;?>">
                </div>
                <div class="details">
                <h2><a href="details.php?id=<?php echo $cardId; ?>"><?php echo $card->name; ?></a></h2>
                <span class="card-type"><span class="icon">🏷</span><?php echo $card->type;?></span>
                <span class="attributes">
                <span class="card-hp"><span class="icon">❤</span><?php echo $card->hp;?></span>
                <span class="card-attack"><span class="icon">⚔</span><?php echo $card->attack;?></span>
                <span class="card-defense"><span class="icon">🛡</span><?php echo $card->defense;?></span>
                </span>
                </div>
                <div class="buyButton buy" <?php if($user->username == "admin"){echo "hidden";}?>>
                <form method="post" class="buyButton">
                <input type="hidden" name="cardId" value="<?php echo $cardId; ?>">
                <button type="submit" name="sellCard" class="buyButton buy"><span class="card-price"><span class="icon">💰</span><?php echo  round($card->price * 0.9); ?></span></button>
                </form>
                </div>
                </div>
                </a>
                
    
    <?php endforeach; ?>
    </div>
</div>

<footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>
</html>
