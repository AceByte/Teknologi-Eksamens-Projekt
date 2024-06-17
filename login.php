<?php
session_start();
$db = new SQLite3('user_management.db');

// Get the form data
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare the query to fetch user data
$query = $db->prepare("SELECT * FROM users WHERE email = :email");
$query->bindValue(':email', $email, SQLITE3_TEXT);
$result = $query->execute();

// Fetch the user data
$user = $result->fetchArray(SQLITE3_ASSOC);

// Verify the password
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['username'] = $user['username'];
    echo "Login successful!";
} else {
    echo "Invalid login credentials!";
}
?>
