<?php
include_once 'cardFunctions.php';
require_once "auth.php";
session_start();
$auth = new Auth();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST['name']) &&
        isset($_POST['hp']) &&
        isset($_POST['type']) &&
        isset($_POST['attack']) &&
        isset($_POST['defense']) &&
        isset($_POST['price'])
    ) {

        $image = isset($_POST['image']) ? $_POST['image'] : '';


        $description = isset($_POST['description']) ? $_POST['description'] : '';


        $newCard = [
            'name' => $_POST['name'],
            'hp' => $_POST['hp'],
            'type' => $_POST['type'],
            'attack' => $_POST['attack'],
            'defense' => $_POST['defense'],
            'price' => $_POST['price'],
            'description' => $description,
            'image' => $image,
        ];
        $db = count(getCards());
        $key = "card".$db;
        addCard($key, $newCard);
        $logged = $_SESSION['user'];
        $auth->login((array)$logged);
        
       header('Location: admin.php');
        exit();
    } else {
      
        echo 'Hiányzó adatok!';
    }
} else {
    header('Location: admin.php');
    exit();
}
?>
