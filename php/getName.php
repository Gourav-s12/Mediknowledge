<?php 

include "config.php";

// Fetch records 

    $response = array();
	$y=0;
	// Select record 
	$sql = "SELECT nameMedi FROM meditable";
	$mediData = mysqli_query($conn,$sql);
	
	
	while($row = mysqli_fetch_assoc($mediData)){
		$response[$y++] = $row['nameMedi']; //get all the medicine name
	}

	echo json_encode($response);
	//exit;
?>