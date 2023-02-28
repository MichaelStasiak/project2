<?php
	// var_dump($_POST);

	// remove next two lines for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	header("Content-Type: application/json; charset=UTF-8");
	include("config.php");
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if ($conn->connect_errno) {
		// $output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";

		echo json_encode($output);
		exit;
	}

	$sql = "SELECT P.id, lastName, firstName, jobTitle, email, D.name as department, L.name as location
		FROM personnel P LEFT JOIN department D ON (D.id = departmentID) LEFT JOIN location L ON (L.id = locationID)
		WHERE lastName LIKE ?
		ORDER BY lastName, firstName, D.name, L.name";
	$val = "%{$_POST['search']}%";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s", $val);
	$stmt->execute();

	if ($stmt === false) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";
	} else {
		$result = $stmt->get_result();
		$data = [];
		while ($row = $result->fetch_assoc())
			array_push($data, $row);

		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
		$output['data'] = $data;
	}

	$conn->close();
	echo json_encode($output);