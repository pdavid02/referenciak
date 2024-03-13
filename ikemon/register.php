<?php
require_once "auth.php";
session_start();
$auth = new Auth();
if(isset($_SESSION['user'])){
    header('Location: index.php');
}
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
    if (is_empty($input, "email")) {
        $errors[] = "E-mail megadása kötelező";
    }
    if ($input["password"] != $input["confirm_password"]) {
        $errors[] = "A jelszavak nem egyeznek";
    }
    if (count($errors) == 0) {
        if ($auth->user_exists($input['username'])) {
            $errors[] = "A felhasználónév már letézik";
        }
    }

    return !(bool) $errors;
}

$errors = [];
if (count($_POST) != 0) {
    if (validate($_POST, $errors, $auth)) {
        $auth->register($_POST);
        $auth->login($_POST);
        header('Location: index.php');
        die;
    }
}
?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció</title>
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
    <div class="container">
    <header>
    <h1><a href="index.php">IKémon</a> > Register</h1>
    </header>
    <?php if ($errors) {?>
    <ul>
        <?php foreach ($errors as $error) {?>
        <li><?=$error?></li>
        <?php }?>
    </ul>
    <?php }?>
    <form action="" method="post">
    <input type="hidden" name="form_state" value="registration">

    <label for="username">Felhasználónév:</label>
    <input type="text" name="username" value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>"><br>

    
    <label for="email">E-mail cím:</label>
        <input type="email" name="email" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>"><br>

        <label for="password">Jelszó:</label>
        <input type="password" name="password"><br>

        <label for="confirm_password">Jelszó újra:</label>
        <input type="password" name="confirm_password"><br>
        <label for="money">Pénz(fix érték):</label><br>
        <input type="number" name="money" value="1000" readonly>

    <input type="submit" value="Regisztráció">
</form>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>