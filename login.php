<?php
    // Database connection
    class MyDB extends SQLite3 {
        function __construct() {
            $this->open('Database.db');
        }
    }

    $db = new MyDB();
    if(!$db) {
        echo $db->lastErrorMsg();
    }

    // Check if form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["Username"];
        $password = $_POST["Password"];

        // Query to check if the user exists
        $stmt = $db->prepare('SELECT * FROM users WHERE username = :username AND password = :password');
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $stmt->bindValue(':password', $password, SQLITE3_TEXT);

        $result = $stmt->execute();

        if ($result->fetchArray()) {
            echo "Login successful";
            // Redirect or do something
        } else {
            echo "Invalid username or password";
        }
    }
?>