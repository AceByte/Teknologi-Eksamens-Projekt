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

    if (isset($_POST['fullname'])) {
        $fullname = $_POST['fullname'];
        $sql = "UPDATE users SET fullname='$fullname' WHERE id='$user_id'";
    } elseif (isset($_POST['username'])) {
        $username = $_POST['username'];
        $sql = "UPDATE users SET username='$username' WHERE id='$user_id'";
    } elseif (isset($_POST['email'])) {
        $email = $_POST['email'];
        $sql = "UPDATE users SET email='$email' WHERE id='$user_id'";
    } elseif (isset($_POST['phone'])) {
        $phone = $_POST['phone'];
        $sql = "UPDATE users SET phone='$phone' WHERE id='$user_id'";
    } elseif (isset($_POST['address'])) {
        $address = $_POST['address'];
        $sql = "UPDATE users SET address='$address' WHERE id='$user_id'";
    } elseif (isset($_POST['password'])) {
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $sql = "UPDATE users SET password='$password' WHERE id='$user_id'";
    }

    if ($conn->query($sql) === TRUE) {
        echo "Profile updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>
