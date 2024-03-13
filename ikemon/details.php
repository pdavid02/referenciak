<link rel="stylesheet" href="styles/main.css">
<link rel="stylesheet" href="styles/details.css">

<?php
include_once 'cardFunctions.php';

$cards = getCards();

$cardId = $_GET['id'] ?? null;

if ($cardId !== null && array_key_exists($cardId, $cards)) {
    $card = $cards[$cardId];

    $backgroundColor = getColorForType($card['type']);

    echo '<header>
    <h1><a href="index.php">IKémon</a> > '.$card['name'].'</h1>
    </header>';
    echo '<div class="content">';
    echo '<div id="details">';
    echo '<div class="image clr-'.$card['type'].'">';
    echo '<img src="' . $card['image'] . '" alt="' . $card['name'] . '">';
    echo '</div>';
    echo '<div class="info">';
    echo '<div class="description">';
    echo $card['description'];
    echo '</div>';
    echo '<span class="card-type"><span class="icon">🏷</span>';
    echo 'Type: ' . $card['type'];
    echo '</span>';
    echo '<div class="attributes">';
    echo '<div class="card-hp"><span class="icon">❤</span> Health:'. $card['hp'] .'</div>
    <div class="card-attack"><span class="icon">⚔</span> Attack:'.$card['attack'].'</div>
    <div class="card-defense"><span class="icon">🛡</span> Defense: '.$card['defense'].'</div>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '<footer>
    <p>IKémon | ELTE IK Webprogramozás</p>
</footer>';
} else {
    echo '<p>Invalid card ID</p>';
}

// Pokémon típusokhoz tartozó szín lekérése
function getColorForType($type) {
    switch ($type) {
        case 'electric':
            return 'yellow';
        case 'fire':
            return 'red';
        case 'grass':
            return 'green';
        case 'water':
            return 'blue';
        case 'bug':
            return 'brown';
        case 'normal':
            return 'gray';
        case 'poison':
            return 'purple';
        default:
            return 'white';
    }
}
?>
