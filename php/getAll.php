<?php
	// example use from browser
	// http://localhost/companydirectory/libs/php/getAll.php

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

	// SQL does not accept parameters and so is not prepared
	$sql = "SELECT P.id, lastName, firstName, jobTitle, email, D.name AS depName, L.name AS locName" .
		" FROM personnel P LEFT JOIN department D ON (D.id = P.departmentID) LEFT JOIN location L ON (L.id = D.locationID)" .
		" ORDER BY lastName";
	//	warunkowe sortowanie:
	if (array_key_exists("sort", $_GET)) {
		if ($_GET["sort"] == "asc") $sql .= " ASC ";
		if ($_GET["sort"] == "dsc") $sql .= " DESC";
	}
	$sql   .= ", firstName, depName, locName";
	$result = $conn->query($sql);

	if (!$result) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "Executed";
		$output['status']['description'] = "Query failed";
	} else {
		$data = [];
		while ($row = $result->fetch_assoc())
			array_push($data, $row);

		$output['status']['code'] = "200";
		$output['status']['name'] = "Ok";
		$output['status']['description'] = "Success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
		$output['data'] = $data;
	}
	$output['status']['query'] = $sql;

	$conn->close();
	echo json_encode($output);