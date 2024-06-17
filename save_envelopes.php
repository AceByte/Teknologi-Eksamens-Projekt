<?php
session_start();
$db = new SQLite3('user_management.db');

$username = $_SESSION['username'];
$envelopes = $_POST['envelopes'];

$query = $db->prepare("UPDATE users SET envelopes = :envelopes WHERE username = :username");
$query->bindValue(':envelopes', json_encode($envelopes), SQLITE3_TEXT);
$query->bindValue(':username', $username, SQLITE3_TEXT);
$query->execute();

echo "Envelopes saved successfully!";
?>
