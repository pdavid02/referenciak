<?php

$jsonData = file_get_contents('cards.json');
$nftk = json_decode($jsonData, true);

function getCards()
{
    global $cardData;
    $jsonData = file_get_contents('cards.json');
    $cardData = json_decode($jsonData, true);

    return $cardData;
}

function addCard($key, $card)
{
    global $nftk;
    $nftk[$key] = (object)$card;

    $usersFile = file_get_contents('users.json');
    $users = json_decode($usersFile, true);

    file_put_contents('cards.json', json_encode($nftk));

    foreach ($users as $username => &$userInfo) {
        if ($userInfo['username'] == "admin") {
            $adCards = getCards();
            $userInfo['cards'] = [];
            foreach ($adCards as $key => $kartya) {
                $userInfo['cards'][] = $kartya;
            }

        }
    }
    file_put_contents('users.json', json_encode($users));

    
}

function setAdmincards(&$admin){
    $kartyak = getCards();
    foreach ($kartyak as $key => $kartya) {
        $admin->cards[] = $kartya;
    }
}

function addCardToAdmin($cardAdmin)
{
    $db = count(getCards());
    $key = "card" . $db;
    addCard($key, $cardAdmin);
}

function buyCard($cardId, $loggedUser)
{
    $kartyak = getCards();
    

    if ($cardId !== null && array_key_exists($cardId, $kartyak)) {
        $card = $kartyak[$cardId];
        if (!$card) {
            return "A kártya nem található.";
        }

        if ($loggedUser->money < $card['price']) {
            return "Nincs elég pénzed erre a vásárlásra.";
        }

        if (count($loggedUser->cards) >= $loggedUser->cardLimit) {
            return "Elérted a kártyalimitet. Nem vehetsz több kártyát.";
        }

        unset($kartyak[$cardId]);
        file_put_contents('cards.json', json_encode($kartyak));

        $usersFile = file_get_contents('users.json');
        $users = json_decode($usersFile, true);


        foreach ($users as $username => &$userInfo) {
            if ($userInfo['username'] == "admin") {
                $userInfo['cards'] = [];
                $userInfo['cards'] = $kartyak;
            }
        }
        file_put_contents('users.json', json_encode($users));
    }



    $loggedUser->money -= $card['price'];
    $loggedUser->cards[] = (object)$card;

    $usersFile = file_get_contents('users.json');
    $users = json_decode($usersFile, true);

        


    foreach ($users as $username => &$userInfo) {
        if ($userInfo['username'] == $loggedUser->username) {
            $userInfo['money'] -= $card['price'];
            $userInfo['cards'] = $loggedUser->cards;
        }
    }

    file_put_contents('users.json', json_encode($users));



}

?>