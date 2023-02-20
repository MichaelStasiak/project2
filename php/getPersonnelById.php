<?php
	// example use from browser
	// http://localhost/companydirectory/libs/php/getPersonnelByID.php?id=<id>

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

	$stmt = $conn->prepare("SELECT * FROM personnel WHERE id = ?");
	$stmt->bind_param("i", $_POST["id"]);
	$stmt->execute();

	if ($stmt === false) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";
	} else {
		$output['data']['personnel']  = $stmt->get_result()->fetch_assoc();		//	!Nie przenosić!

		$sql = "SELECT * from department ORDER BY name";
		$result = $conn->query($sql);

		if (!$result) {
			$output['status']['code'] = "401";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed";

			$conn->close();
			echo json_encode($output);
			exit;
		}

		$department = [];
		while ($row = $result->fetch_assoc())
			array_push($department, $row);

		$output['status']['code'] = "200";
		$output['status']['name'] = "Ok";
		$output['status']['description'] = "Success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
		// $output['data']['personnel']  = $personnel;
		$output['data']['department'] = $department;
	}

	$conn->close();
	echo json_encode($output);