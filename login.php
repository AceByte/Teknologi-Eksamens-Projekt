<?php
// Start the session
session_start();

// Establish a connection to the SQLite database
$database = new SQLite3('Database.db');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the user input
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare a SQL query to fetch the user with the given username
    $query = "SELECT * FROM users WHERE username = :username";
    $statement = $database->prepare($query);
    $statement->bindValue(':username', $username);
    $result = $statement->execute();

    // Check if the user exists
    $row = $result->fetchArray(SQLITE3_ASSOC);
    if ($row) {
        // Verify the password
        if (password_verify($password, $row['password'])) {
            // Store user data in session variables
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];

            // Redirect the user to the dashboard or any other page
            header("Location: dashboard.php");
            exit();
        } else {
            // Display an error message if the password is incorrect
            echo "Invalid username or password.";
        }
    } else {
        // Display an error message if the user does not exist
        echo "Invalid username or password.";
    }
}
?>
