<?php
	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=<id>

	// remove next two lines for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	header('Content-Type: application/json; charset=UTF-8');
	include("config.php");
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if ($conn->connect_errno) {
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";

		echo json_encode($output);
		exit;
	}

	$stmt = $conn->prepare("INSERT INTO department (name, locationID) VALUE (?, ?)");
	$stmt->bind_param("si", $_POST["name"], $_POST["locId"]);
	$stmt->execute();

	if ($stmt === false) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
	} else {
		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
	}
	// $output['data'] = [];

	mysqli_close($conn);
	echo json_encode($output);