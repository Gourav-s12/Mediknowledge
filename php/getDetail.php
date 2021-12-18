<?php 

include "config.php";
 
if(isset($_GET['MediName'])){
	$MediName = $_GET['MediName'];
}

// Fetch records 

  $response = array();
	// Select record 
	$sql = "SELECT * FROM meditable where nameMedi= '".$MediName."';";


	$mediData = mysqli_query($conn,$sql);
	
	
	if($row = mysqli_fetch_assoc($mediData)){
		$response[] = array(
			"nameMedi" => $row['nameMedi'],
      		"errMedi" => 'no',
			"useMedi" => $row['useMedi'],
			"introMedi" => $row['introMedi'],
			"warnMedi" => $row['warnMedi'],
			"takeMedi" => $row['takeMedi'],
			"sideEffectMedi" => $row['sideEffectMedi'],
      		"ifMissMedi" => $row['ifMissMedi'],
		);
	}else{
		$response[] = array(
      		"errMedi" => 'yes',
		);
	}

	echo json_encode($response);
	//exit;
?>