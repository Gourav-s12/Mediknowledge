<?php

$host = "Host name"; /* Host name */
$user = "User"; /* User */
$password = "Password"; /* Password */
$dbname = "Database name"; /* Database name */

$conn = mysqli_init(); 
mysqli_ssl_set($conn,NULL,NULL, "DigiCertGlobalRootCA.crt.pem", NULL, NULL); 
mysqli_real_connect($conn, $host, $user, $password, $dbname, 3306, MYSQLI_CLIENT_SSL);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}