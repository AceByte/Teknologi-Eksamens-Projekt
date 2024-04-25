<?php
// Establish a connection to the SQLite database
$database = new SQLite3('Database.db');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the user input
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Check if the email is already registered
    $query = "SELECT * FROM users WHERE email = :email";
    $statement = $database->prepare($query);
    $statement->bindValue(':email', $email);
    $result = $statement->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);

    if (!$row) {
        // Prepare a SQL query to insert the new user into the database
        $insert_query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $insert_statement = $database->prepare($insert_query);
        $insert_statement->bindValue(':username', $username);
        $insert_statement->bindValue(':email', $email);
        $insert_statement->bindValue(':password', $password);
        $insert_statement->execute();

        // Redirect the user to the login page
        header("Location: login.html");
        exit();
    } else {
        // Display an error message if the email is already registered
        echo "Email is already registered. Please use a different email.";
    }
}
?>