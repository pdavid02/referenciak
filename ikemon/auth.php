<?php
require_once "user.php";
include_once 'cardFunctions.php';
class Auth
{
    private $userRepository;
    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }
  /*   public function register($user)
    {
        $user['password'] = password_hash($user['password'], PASSWORD_DEFAULT);
        $user['confirm_password'] = $user['password'];
        
        if($user['username'] == "admin"){
            $user['isAdmin'] = true;
            $kartyak = getCards();
            $user['cards'] = array();
            foreach ($kartyak as $k => $cardsA) {
                $user->cards = $cardsA;
            }
        }
        else{
            $user['isAdmin'] = false;
            $user['cards'] = array();
        }
        $user['cardLimit'] = 5;
        return $this->userRepository->insert((object) $user);
    } */

    public function register($user)
{
    $userObject = (object)$user;

    $userObject->password = password_hash($userObject->password, PASSWORD_DEFAULT);
    $userObject->confirm_password = $userObject->password;

    if ($userObject->username == "admin") {
        $userObject->isAdmin = true;
        $userObject->cardLimit = 999999;
        $kartyak = getCards();
        $userObject->cards = array();
        setAdmincards($userObject);
    } else {
        $userObject->isAdmin = false;
        $userObject->cards = array();
        $userObject->cardLimit = 5;
    }

    return $this->userRepository->insert($userObject);
}

    


    public function user_exists($username)
    {
        $users = $this->userRepository->filter(function ($user) use ($username) {
            return ((array) $user)['username'] === $username;
        });
        return count($users) >= 1;
    }
    public function login($datas)
    {
        $username = $datas['username'];
        $users = $this->userRepository->filter(function ($user) use ($username) {
            return ((array) $user)['username'] === $username;
        });
        $user = reset($users);
        $_SESSION['user'] = $user;
    }
    public function check_credentials($username, $password)
    {
        $users = $this->userRepository->filter(function ($user) use ($username) {
            return ((array) $user)['username'] === $username;
        });
        if (count($users) === 1) {
            $user = (array) array_values($users)[0];
            return password_verify($password, $user["password"])
            ? $user
            : false;
        }
        return false;
    }
    public function is_authenticated()
    {
        return isset($_SESSION);
    }
    public function logout()
    {
        unset($_SESSION);
    }
}