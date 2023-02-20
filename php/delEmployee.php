<?php
	//print_r($_SERVER['REQUEST_METHOD']);
	// print_r($_SERVER);

	//print_r($_GET);
	//print_r($_POST);
	//print_r($_REQUEST);

	//  !niedobre bo PHP wysyła włanse komunikaty o błędach, w tym Stack trace!
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$startTime = microtime(true);
	header("Content-Type: application/json; charset=UTF-8");
	include("config.php");
	// $conn = new mysqli("", "root", "", "CD");
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if ($conn->connect_errno) {
		$output['status']['code'] = "300";
		$output['status']['message'] = "Failure";
		$output['status']['description'] = "database unavailable";

		echo json_encode($output);
		exit;
	}

	//$result = $conn->query("DELETE FROM Personnel WHERE Id = {$_GET['id']}");
	//print_r($result);		//	= 1
	//var_dump($result);	//	bool(true)

	try {
		$stmt = $conn->prepare("DELETE FROM personnel WHERE id = ?");
		$stmt->bind_param("i", $_POST["id"]);
		$stmt->execute();

		$output['status']['code'] = "200";
		$output['status']['message'] = "Ok";
		$output['status']['description'] = "Success";
		$output['status']['returnedIn'] = intval((microtime(true) - $startTime) * 1000) . "ms";
	} catch (Exception $e) {
		// echo $e->getMessage();
		// var_dump($stmt);

		$output['status']['code'] = "400";
		$output['status']['name'] = "Executed";
		$output['status']['description'] = "Query failed";
	}

	$conn->close();
	echo json_encode($output);