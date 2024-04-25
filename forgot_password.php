<?php
// Establish a connection to the SQLite database
$database = new SQLite3('Database.db');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email entered by the user
    $email = $_POST['email'];

    // Prepare a SQL query to fetch the user with the given email
    $query = "SELECT * FROM users WHERE email = :email";
    $statement = $database->prepare($query);
    $statement->bindValue(':email', $email);
    $result = $statement->execute();

    // Check if the user exists
    $row = $result->fetchArray(SQLITE3_ASSOC);
    if ($row) {
        // Generate a random password
        $new_password = generateRandomPassword();

        // Update the user's password in the database
        $update_query = "UPDATE users SET password = :password WHERE email = :email";
        $update_statement = $database->prepare($update_query);
        $update_statement->bindValue(':password', password_hash($new_password, PASSWORD_DEFAULT));
        $update_statement->bindValue(':email', $email);
        $update_statement->execute();

        // Send the new password to the user via email (you need to implement this part)

        // Display a success message
        echo "Your password has been reset. Check your email for the new password.";
    } else {
        // Display an error message if the user does not exist
        echo "User with this email does not exist.";
    }
}

// Function to generate a random password
function generateRandomPassword($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $password;
}
?>