<?php
require_once "auth.php";
include_once 'cardFunctions.php';
session_start();
$auth = new Auth();

if($auth->is_authenticated()){
    if (isset($_SESSION['user'])) {
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
            $cardId = $_GET['id'];
            $loggedUser = $_SESSION['user'];
            if ($loggedUser->username != "admin") {
                $result = buyCard($cardId, $loggedUser);
            }
            if($result != null){
                header('Location: index.php?variable='.$result.'');
            }
            else{
                header('Location: index.php');
            }
            exit();
        } else {
            echo 'Hibás kérés.';
        }
        



    }
    else{
        header('Location: index.php');
    }
}


?>