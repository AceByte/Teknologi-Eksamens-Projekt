<<?php
session_start();
session_destroy();
echo "Logged out successfully!";
header("Location: login.html");
?>
