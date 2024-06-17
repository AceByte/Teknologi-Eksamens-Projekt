<?php
session_start();
$db = new SQLite3('user_management.db');

// Assuming a POST request with 'field' and 'value'
$field = $_POST['field'];
$value = $_POST['value'];
$username = $_SESSION['username'];

$query = $db->prepare("UPDATE users SET $field = :value WHERE username = :username");
$query->bindValue(':value', $value, SQLITE3_TEXT);
$query->bindValue(':username', $username, SQLITE3_TEXT);
$query->execute();

echo "Profile updated successfully!";
?>
