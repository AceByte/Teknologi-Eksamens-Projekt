<?php
session_start();
$db = new SQLite3('user_management.db');

$username = $_SESSION['username'];

$query = $db->prepare("SELECT envelopes FROM users WHERE username = :username");
$query->bindValue(':username', $username, SQLITE3_TEXT);
$result = $query->execute();
$row = $result->fetchArray(SQLITE3_ASSOC);

echo json_encode($row['envelopes']);
?>
