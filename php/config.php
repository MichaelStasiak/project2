<?php
	// connection details for MySQL database:
	$cd_host = "localhost";
	$cd_port = 3306;
	$cd_socket = "";

	// database name, username and password:

	//	localhost:
	$servName = $_SERVER["SERVER_NAME"];

	if ($servName == "localhost") {
		$cd_dbname	 = "CD";
		$cd_user	 = "root";
		$cd_password = "";
	} else

	//	Hosting House:
	if ($servName == "mvdbsoftware.eu") {
		$cd_port = 21;

		$cd_dbname	 = "mvdbsoft_CD1";
		$cd_user	 = "mvdbsoft_mike9";
		$cd_password = "123qwe";
	}

	//	HOSTINGER:
	if ($servName == "mikestasiak.co.uk" OR	$servName == "cd.mikestasiak.co.uk") {
		$cd_dbname	 = "u948264589_CD";
		$cd_user	 = "u948264589_mike";
		$cd_password = "566248kspeC!";
	}
