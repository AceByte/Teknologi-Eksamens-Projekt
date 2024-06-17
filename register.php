<?php
$db = new SQLite3('user_management.db');

$fullname = $_POST['fullname'];
$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$password = $_POST['password'];

$query = $db->prepare("INSERT INTO users (fullname, username, email, phone, address, password) VALUES (:fullname, :username, :email, :phone, :address, :password)");
$query->bindValue(':fullname', $fullname, SQLITE3_TEXT);
$query->bindValue(':username', $username, SQLITE3_TEXT);
$query->bindValue(':email', $email, SQLITE3_TEXT);
$query->bindValue(':phone', $phone, SQLITE3_TEXT);
$query->bindValue(':address', $address, SQLITE3_TEXT);
$query->bindValue(':password', $password, SQLITE3_TEXT);
$query->execute();

echo "Registration successful!";
?>
