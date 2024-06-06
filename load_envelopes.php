<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

session_start();

$user_id = $_SESSION['user_id'];

$sql = "SELECT name, amount FROM envelopes WHERE user_id='$user_id'";
$result = $conn->query($sql);

$envelopes = array();
while($row = $result->fetch_assoc()) {
    $envelopes[] = $row;
}

echo json_encode($envelopes);

$conn->close();
?>
