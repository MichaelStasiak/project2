<?php
	//ini_set('display_errors', 'On');
	//  !niedobre bo PHP wysyła włanse komunikaty o błędach, w tym Stack trace!
	error_reporting(E_ALL);

	$startTime = microtime(true);

	header("Content-Type: application/json; charset=UTF-8");

	$conn = new mysqli("", "root", "", "CD");

	if ($conn->connect_errno) {
		$output['status']['code'] = "300";
		$output['status']['message'] = "Failure";
		$output['status']['description'] = "database unavailable";

		echo json_encode($output);
		exit;
	}

	$result = $conn->query("SELECT * FROM Department");
	//  !tu obsraniec ma to samo!

	if (!$result) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "Executed";
		$output['status']['description'] = "query failed";
	}
	else {
		$data = [];
		//$data = array();

		while ($row = $result->fetch_assoc())
			array_push($data, $row);

		$output['status']['code'] = "200";
		$output['status']['message'] = "OK";
		$output['status']['description'] = "Success";
		$output['data'] = $data;
	}

	$output['status']['returnedIn'] = intval((microtime(true) - $startTime) * 1000) . "ms";
	echo json_encode($output);
	$conn->close();
