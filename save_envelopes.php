<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $envelopes = json_decode(file_get_contents('php://input'), true)['envelopes'];

    // Delete existing envelopes for the user
    $sql = "DELETE FROM envelopes WHERE user_id='$user_id'";
    $conn->query($sql);

    // Insert new envelopes
    foreach ($envelopes as $envelope) {
        $name = $envelope['name'];
        $amount = $envelope['amount'];
        $sql = "INSERT INTO envelopes (user_id, name, amount) VALUES ('$user_id', '$name', '$amount')";
        $conn->query($sql);
    }

    echo "Envelopes saved successfully!";
}
$conn->close();
?>
