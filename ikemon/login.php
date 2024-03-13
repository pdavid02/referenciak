<?php
require_once "auth.php";
session_start();
$auth = new Auth();
function is_empty($input, $key)
{
    return !(isset($input[$key]) && trim($input[$key]) !== "");
}
function validate($input, &$errors, $auth)
{

    if (is_empty($input, "username")) {
        $errors[] = "Felhasználónév megadása kötelező";
    }
    if (is_empty($input, "password")) {
        $errors[] = "Jelszó megadása kötelező";
    }
    if (count($errors) == 0) {
        if (!$auth->check_credentials($input['username'], $input['password'])) {
            $errors[] = "Hibás felhasználónév vagy jelszó";
        }
    }

    return !(bool) $errors;
}

$errors = [];
if (count($_POST) != 0) {
    if (validate($_POST, $errors, $auth)) {
        $auth->login($_POST);
        header('Location: index.php');
        die();
    }
}
?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejelentkezés</title>
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
<div class="container">
    <header>
    <h1><a href="index.php">IKémon</a> > Login</h1>
    </header>
    <?php if ($errors) {?>
    <ul>
        <?php foreach ($errors as $error) {?>
        <li><?=$error?></li>
        <?php }?>
    </ul>
    <?php }?>
    <form action="" method="post">
        <label for="username">Felhasználó: </label>
        <input name="username" type="text"><br>
        <label for="password">Jelszó: </label>
        <input name="password" type="password"><br>
        <input type="submit" value="Bejelentkezés">
    </form>
    <a href="register.php">Regisztáció</a>
</div>
<footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>