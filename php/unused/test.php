<!DOCTYPE html>
<html lang="en">
<head>
	<title>Company Directory - Home Page</title>
	<meta charset="UTF-8">
</head>
<body>
	<h1>Zawartość tabeli departamenty:</h1>
	<?php
		ini_set('display_errors', 'On');
		//error_reporting(E_ALL);

		$conn = new mysqli("", "root", "", "CD");

		// echo "<pre>";
		// print_r($conn);
		// echo "</pre>";

		if ($conn->connect_errno)
			die("Connection failed: " . $conn->connect_error);

		$result = $conn->query("SELECT * FROM department");
		if ($result->num_rows)
			while ($row = $result->fetch_assoc())
				echo $row["id"] . $row["name"] . $row["locationID"] . "</br>";

		$conn->close();
		//phpinfo();
	?>
</body>
</html>