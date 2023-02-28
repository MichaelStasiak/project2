<!DOCTYPE html>
<html>
<head>
	<title>Server Info</title>
</head>

<style>
	span {
		color: blue;
	}
</style>

<body>
	hosting:
	<strong>
	<?php
		ini_set("display_errors", "On");
		error_reporting(E_ALL);

		date_default_timezone_set("Europe/Warsaw");

		if ($_SERVER["SERVER_NAME"] == "localhost")				echo "localhost";
		if ($_SERVER["SERVER_NAME"] == "mvdbsoftware.eu")		echo "Hosting House";
		if ($_SERVER["SERVER_NAME"] == "mikestasiak.co.uk" or
			$_SERVER["SERVER_NAME"] == "cd.mikestasiak.co.uk")	echo "HOSTINGER";
	?>
	</strong></br>

	<?php
		echo "server name: <span>{$_SERVER["SERVER_NAME"]}</span></br>";								//	URL = server name
		echo "server IP:Port: <span>{$_SERVER["SERVER_ADDR"]}:{$_SERVER["SERVER_PORT"]}</span></br>";	//	server IP:Port
		echo "client IP:Port: <span>{$_SERVER["REMOTE_ADDR"]}:{$_SERVER["REMOTE_PORT"]}</span></br>";	//	client IP:Port
		echo "script filename: <span>{$_SERVER["SCRIPT_FILENAME"]}</span></br>";
		echo "request time: <span>", date("H:i:s l d.m.Y", $_SERVER["REQUEST_TIME"]), "r. ({$_SERVER["REQUEST_TIME"]})</span></br>";

		echo "<pre>";
		var_dump($_SERVER);
		echo "</pre>";

		phpinfo();	//	INFO_GENERAL INFO_ALL
	?>
</body>
</html>