
<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin-Panel</title>
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
    <div class="container">
    <header>
    <h1><a href="index.php">IKémon</a> > Kártya létrehozása</h1>
    </header>
    <form action="createCard.php" method="post">
    <label for="name">Pokémon neve:</label>
    <input type="text" id="name" name="name" required>

    <label for="hp">Pokémon életereje/HP:</label>
    <input type="number" id="hp" name="hp" required>

    <label for="type">Pokémon eleme:</label>
    <input type="text" id="type" name="type" required>

    <label for="attack">Pokémon támadó ereje:</label>
    <input type="number" id="attack" name="attack" required>

    <label for="defense">Pokémon védekezése:</label>
    <input type="number" id="defense" name="defense" required>

    <label for="price">Kártya ára:</label>
    <input type="number" id="price" name="price" required>

    <label for="description">Pokémon leírása:(opcionális)</label>
    <textarea id="description" name="description"></textarea>

    <label for="image">Kép a kártyáról (opcionális):</label>
    <input type="text" id="image" name="image">

    <button type="submit">Kártya létrehozása</button>
    </form>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>
