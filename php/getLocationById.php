<?php
	// remove next two lines for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	header('Content-Type: application/json; charset=UTF-8');
	include("config.php");
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if ($conn->connect_errno) {
		$output['status']['code'] = "300";
		$output['status']['name'] = "Failure";
		$output['status']['description'] = "Database unavailable";

		echo json_encode($output);
		exit;
	}

	$stmt = $conn->prepare('SELECT * FROM location WHERE id = ?');
	$stmt->bind_param("i", $_POST['id']);
	$stmt->execute();

	if ($stmt === false) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "Executed";
		$output['status']['description'] = "Query failed";
	} else {
		$output['status']['code'] = "200";
		$output['status']['name'] = "OK";
		$output['status']['description'] = "Success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . "ms";
		$output['data'] = $stmt->get_result()->fetch_assoc();	//	jest ok, otrzymamy tylko jeden rekord
	}

	$conn->close();
	echo json_encode($output);