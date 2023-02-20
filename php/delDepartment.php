<?php
	// example use from browser
	// use insertDepartment.php first to create new dummy record and then specify it's id in the command below
	// http://localhost/companydirectory/libs/php/deleteDepartmentByID.php?id=<id>

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

	try {
		$stmt = $conn->prepare("DELETE FROM department WHERE id = ?");
		$stmt->bind_param("i", $_POST["id"]);
		$stmt->execute();

		if ($stmt->errno) throw new Exception("Error Processing Request", 1);	//	!bo ten pierdolony stary rupieć nie raczy rzucać wyjątków!

		$output['status']['code'] = "200";
		$output['status']['name'] = "Ok";
		$output['status']['description'] = "Success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
	} catch (Exception $e) {
		// echo $e->getMessage();
		// var_dump($stmt);

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	

		$output["data"] = "Twoja DB nie rzuca, albo nie łapie wyjątków!";
		$output["note"] = $stmt->error;
	}

	$conn->close();
	echo json_encode($output);