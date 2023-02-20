//	wywołanie mojego endpoint'a:
/*$.get("php/getDepartments.php",
	result => {
		console.log(result);
		if (result.status.code == 200) {
			var rd = result.data;
			console.log(rd[0].name);
			$("#dep").html(rd[0].name);
		}
		else console.log("else: status.code != 200");
	}
);*/

//	DocumentReady Event in jQ:
$(() => {
	console.log("document.ready():");

	//	Button Employees:
	$("#btnEmployees")	.click(() => loadEmployees());

	//	Button Departments:
	$("#btnDepartments").click(() => loadDepartments());

	//	Button Locations:
	$("#btnLocations")	.click(() => loadLocations());

	//	Button Search: &
	$(".btn-info").click(() => {
		console.log("Search:");
		//	kasowanie starych danych:
		// $("#employees").remove();	//	niby ok
		$("#employees").empty();	//	ok
		//	wypełnienie nowymi danymi:
		// console.log($(this));					//	Object Window
		// console.log($(this).prev().prev());		//	empty Object
		// console.log($(".btn-info").prev());		//	input
		// console.log($(".btn-info").parent().children("input").val());	//	form
		$.post("php/getSearch.php",
			{search: $(".btn-info").prev().val()},
			result => fillEmployees(result));
	});

	//	sortowanie: &&
	// console.log($(".btn-outline-primary"));		//	są 2

	$(".btn-outline-primary").first().click(() => {
		console.log("Sort ascending:");
		$("#employees").empty();
		$.get("php/getAll.php",
			{sort: "asc"},
			result => fillEmployees(result));
	});

	$(".btn-outline-primary").last().click(() => {
		console.log("Sort descending:");
		$("#employees").empty();
		$.get("php/getAll.php",
			{sort: "dsc"},
			result => fillEmployees(result));
	});

	//	badanie metody na poszukiwaie właściwego button'a:
	// console.log($("#modLocation"));
	// console.log($("#modLocation").find(".btn-success"));
	// console.log($("#modLocation .btn-success"));	//	najlepszy sposób

	// console.log($("#divEmployee button"));	//	4x
	// console.log($("#divEmployee .btn-success"));	//	1x
	// console.log($(".btn-success"));		//	9x

	// console.log($("#divDepartment button"));	//	1x
	// console.log($("#divDepartment button.btn-success"));	//	1x

	//	Button "Add Employee":
	$("#btnEmployeeAdd").click(() => {
		// console.log($("#btnEmployeeAdd"));

		//	skorygować modal:
		$("#modEmployee h5").html("Add employee");
		$("#btnEmpAdd").html("Add");

		//	wyczyścić pola:
		$("#modEmployee input").val("") ;

		let sel = $("#modEmployee select");
		//	wyczyść zawartość:
		sel.empty();
		//	wypełnij aktualnymi danymi:
		$.get("php/getAllDepartments.php", result => result.data.forEach(item => sel.append(new Option(item["name"], item["id"]))));
	});

	//	Button "Add Department":
	$("#btnDepartmentAdd").click(() => {
		// console.log($("#btnDepartmentAdd"));

		//	skorygować modal:
		$("#modDepartment h5").html("Add department");
		$("#btnDepAdd").html("Add");

		//	wyczyścić pola:
		$("#modDepartment input").val("") ;

		let sel = $("#modDepartment select");
		//	wyczyścić zawartość:
		// sel.children().remove();
		sel.empty();
		// wypełnij aktualnymi danymi:
		$.get("php/getAllLocations.php", result => result.data.forEach(item => sel.append(new Option(item["name"], item["id"]))));
	});

	//	Button "Add Location":
	$("#btnLocationAdd").click(() => {
		// console.log($("#btnLocationAdd"));

		//	skorygować modal:
		$("#modLocation h5").html("Add location");
		$("#btnLocAdd").html("Add");

		//	wyczyścić pola:
		$("#modLocation input").val("") ;
	});

	//	button "Add" Employee:
	// $("#modEmployee .btn-success").click(() => {
	$("#btnEmpAdd").click(() => {
		if ($("#btnEmpAdd").text() == "Add") {
			console.log("Event: Add Employee");
			// console.log($("#modEmployee input"));
			// console.log($("#modEmployee select"));
			$.post("php/addEmployee.php",
				{fName: $("#modEmployee input")[1].value,
				 lName: $("#modEmployee input")[2].value,
				 title: $("#modEmployee input")[3].value,
				 email: $("#modEmployee input")[4].value,
				 depId: $("#modEmployee select").val()},
				result => {
					// console.log(result);
					loadEmployees();
					$("div.alert-success").toggleClass("visually-hidden")
				}
			);
		} else {
			console.log("Event: Update Employee");
			//potrzebne ukryte pole z id; dodałem
			$.post("php/updateEmployee.php",
				{id:    $("#modEmployee #id").val(),
				 fName: $("#modEmployee input")[1].value,
				 lName: $("#modEmployee input")[2].value,
				 title: $("#modEmployee input")[3].value,
				 email: $("#modEmployee input")[4].value,
				 depId: $("#modEmployee select").val()},
				result => {
					// console.log(result);
					loadEmployees();
					$("div.alert-success").toggleClass("visually-hidden");
				}
			);
		}
	});

	//	button "Add" Department:
	// $("#modDepartment .btn-success").click(() => {
	$("#btnDepAdd").click(() => {
		if ($("#btnDepAdd").text() == "Add") {
			console.log("Event: Add Department");
			//console.log($("#modDepartment input"));
			//console.log($("#modDepartment input")[0]);
			//console.log($("#modDepartment input")[0].value, $("#modDepartment input")[1].value);
			//console.log($("#modDepartment select").val());
			$.post("php/addDepartment.php",
				// {name:		 $("#modDepartment input")[0].value,
				//  locationID: $("#modDepartment input")[1].value},
				{name:	$("#modDepartment #name" ).val(),
				 locId:	$("#modDepartment select").val()},
				result => {
					// console.log(result);
					loadDepartments();
					$("div.alert-success").toggleClass("visually-hidden");
				}
			);
		} else {
			console.log("Event: Update Department");
			$.post("php/updateDepartment.php",
				{id:	$("#modDepartment #id")   .val(),
				 name:	$("#modDepartment #name") .val(),
				 locId:	$("#modDepartment select").val()},
				result => {
					// console.log(result);
					loadDepartments();
					$("div.alert-success").toggleClass("visually-hidden");
				}
			);
		}
	});

	//	button "Add" Location:
	// $("#modLocation .btn-success").click(() => {
	$("#btnLocAdd").click(() => {
		if ($("#btnLocAdd").text() == "Add") {
			console.log("Event: Add Location");
			//console.log($("#modLocation input").val());
			$.post("php/addLocation.php", 
				{name: $("#modLocation #name").val()},
				result => {
					// console.log(result);
					loadLocations();
					$("div.alert-success").toggleClass("visually-hidden");
				}
			);
			// .done($("div.alert-success").toggleClass("visually-hidden"))
			// .fail($("div.alert-warning").toggleClass("visually-hidden"))
			// .always(loadLocations());
		} else {
			console.log("Event: Update Location");
			$.post("php/updateLocation.php",
				{id:	$("#modLocation #id")   .val(),
				 name:	$("#modLocation #name") .val()},
				result => {
					// console.log(result);
					loadLocations();
					$("div.alert-success").toggleClass("visually-hidden");
				}
			);
		}
	});
});

//	====================== EMPLOYEES ========================
function loadEmployees() {
	// console.log($("#btnEmployees"));
	// console.log($("#btnEmployees").hasClass("collapsed"));

	if (!$("#btnEmployees").hasClass("collapsed")) {
		console.log("Load Employees:");

		$("#employees").empty();
		$.get("php/getAll.php", result => fillEmployees(result));
	}
}

function fillEmployees0(result) {
	// console.log(result);

	if (result.status.code == 200) {
		// console.log(result.data);
		result.data.forEach(item => {
			/*$("#desktop").append(
				"<tr>\
					<td>" + item["lastName"] + "<br>" + item["firstName"] + "</td>\
					<td>" + item["jobTitle"] + "<br>" + item["email"] + "</td>\
					<td>" + item["department"] + "<br>" + item["location"] + "</td>\
					<td>\
						<button type='button' class='btn btn-warning data-bs-toggle='modal' data-bs-target='#employeeUpdateModal'>Edit</button><br>\
						<button type='button' class='btn btn-danger delEmp' value='" + item["id"] + "'>Delete</button></td>\
				</tr>");*/

			$("#employees").append("<h2 class='accordion-header' id='heading'><button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + item["id"] + "' aria-expanded='false' aria-controls='collapse" + item["id"] + "'>" + item["lastName"] + " " + item["firstName"] +"</button></h2>\
				<div id='collapse" + item["id"] + "' class='accordion-collapse collapse' aria-labelledby='heading1' data-bs-parent='#accordionExample'>\
					<div class='accordion-body'>\
						Job title: " + item["jobTitle"] + "<br>Email: " + item["email"] + "<br>Department: " + item["department"] + "<br>Location: " + item["location"] + "<br>\
						<button type='button' class='btn btn-warning editEmp' data-bs-toggle='modal' data-bs-target='#employeeUpdateModal' value='" + item["id"] + "'>Edit</button>\
						<button type='button' class='btn btn-danger delEmp' value='" + item["id"] + "'>Delete</button><hr>\
				</div></div>"

				/*"<div class='col'>\
					<div class='card'>\
						<div class='card-header'>" + item["lastName"] + " " + item["firstName"] +"</div>\
						<ul class='list-group list-group-flush'>\
							<li class='list-group-item'>Job title: " + item["jobTitle"] + "<br>Email: " + item["email"] + "</li>\
							<li class='list-group-item'>Department: " + item["department"] + "<br>Location: " + item["location"] + "</li>\
							<li class='list-group-item'>\
								<button type='button' class='btn btn-warning editEmp' data-bs-toggle='modal' data-bs-target='#employeeUpdateModal' value='" + item["id"] + "'>Edit</button>\
								<button type='button' class='btn btn-danger delEmp' value='" + item["id"] + "'>Delete</button>\
							</li>\
						</ul>\
					</div>\
				</div>"*/
			);
		});

		$(".editEmp").click(editEmployee);
		$(".delEmp").click(delEmployee);
	}
	else console.log(result.status.code, result.status.name, result.status.description);
}

	/*<h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        ...
      </div>
    </div>*/

function fillEmployees(result) {
	result.data.forEach(item =>
		$("#employees").append("<div class='accordion-item'>\
			<h2 class='accordion-header' id='heading'>\
				<button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + item["id"] + "' aria-expanded='false' aria-controls='collapse" + item["id"] + "'>"
					+ item["lastName"] + " " + item["firstName"] +
				"</button>\
			</h2>\
			<div id='collapse" + item["id"] + "' class='accordion-collapse collapse' aria-labelledby='heading'>\
				<div class='accordion-body'>\
					Job title: " + item["jobTitle"] + "<br>Email: " + item["email"] + "<br>Department: " + item["depName"] + "<br>Location: " + item["locName"] + "<br>\
					<button type='button' class='btn btn-warning editEmp' data-bs-toggle='modal' data-bs-target='#modEmployee' value='" + item["id"] + "'>Edit</button>\
					<button type='button' class='btn btn-danger delEmp' value='" + item["id"] + "'>Delete</button>\
				</div>\
			</div>\
		</div>")
	);

	$(".editEmp").click(editEmployee);
	$(".delEmp").click(delEmployee);
}

function editEmployee() {
	// console.log("editEmployee:", this.value);	//	bo button dostał taki atrybut
	// console.log($().val());			//	undefined
	// console.log($(this).val());		//	23

	// console.log("aria-hidden =", $("#modEmployee").attr("aria-hidden"));

	//	skorygować modal:
	$("#modEmployee h5").text("Update employee");
	$("#btnEmpAdd").text("Update");

	//	wywołać modal: modal się wywołuje automatycznie (bootstrap)

	$.post("php/getPersonnelById.php",
		{id: this.value},
		result => {
			let rdp = result.data.personnel;
			let rdd = result.data.department;

			// console.log(rdp);
			// console.log(rdd);

			//	wstrzyknąć dane:
			// console.log($("#modEmployee input"));
			$("#modEmployee input#id").val(rdp.id);
			$("#modEmployee input")[1].value = rdp.firstName;
			$("#modEmployee input")[2].value = rdp.lastName;
			$("#modEmployee input")[3].value = rdp.jobTitle;
			$("#modEmployee input")[4].value = rdp.email;
			let sel = $("#modEmployee select");
			sel.empty();
			rdd.forEach(item => sel.append(new Option(item["name"], item["id"])));
			sel.val(rdp.departmentID);

			//	wywołać endpoint - nie tu; to ma zrobić klawisz potwierdzający
			//$("#btnEmpAdd").click(updateEmployee);
		}
	);
}

function updateEmployee() {
	//jak usunąć obsługę zdarzenia klawisza Add??
}

function delEmployee() {
	console.log("delEmployee:", this.value);	//	'value' to atrybut elementu html

	$.post("php/delEmployee.php", {id: this.value}, result => {
		if (result.status.code == 200) {
			//console.log(result);
			//console.log(this);		//	tak, zwraca wciśnięty <button>
			//console.log($(this));	//	zwraca Object {}
			//console.log($(this).parent());	//	accordion-body
			//console.log($(this).parent().parent());	//	collapse104
			//console.log($(this).parent().parent().prev());	//	a
			// gdyby tu była klasa generowana dynamicznie... to jq by to 'pociął'

			let t3p = $(this).parent().parent().parent();
			// console.log(t3p);
			//$(tpp).prev().remove();	//	gdy nie było div.accordion-item
			$(t3p).remove();
			$("div.alert-success").toggleClass("visually-hidden");
		} else {
			console.log("Error:", result.status.description);

			$("div.alert-danger").toggleClass("visually-hidden");
		}
	});

	//	przykład na wywołanie AJAX'em innej metody:
	/*$.ajax({
		url: "php/delEmployee.php",
		type: 'DELETE',
		//	dataType: "JSON",
		data: {id: this.value},
		success: result => {},
		error: jqXHR => {}
	});*/
}

//	==================== DEPARTMENTS ==========================
function loadDepartments() {
	if (!$("#btnDepartments").hasClass("collapsed")) {
		console.log("Load Departments:");

		$("#departments").empty();
		$.get("php/getAllDepartments.php", result => {
			// console.log(result);

			if (result.status.code == 200) {
				// console.log(result.data);
				result.data.forEach(item => {
					$("#departments").append(
						/*"<table id='tab' class='table table-striped table-hover table-info'>\
							<tbody>\
								<tr>\
									<td><span>ID:</span><br>" + item["id"] + "</td>\
									<td><span>DEPARTMENT NAME:</span><br>" + item["name"] + "</td>\
									<td><span>LOCATION ID:</span><br>" + item["locationID"] + "</td>\
								</tr>\
								<tr>\
									<td><button type='button' class='btn btn-warning editDep' data-bs-toggle='modal' data-bs-target='#modDepartment' value='" + item["id"] + "'>Edit</button></td>\
									<td colspan='2'><button type='button' class='btn btn-danger delDep' value='" + item["id"] + "'>Delete</button></td>\
								</tr>\
							</tbody>\
						</table>"*/
						"<tr>\
							<td>" + item["id"] + "</td>\
							<td>" + item["name"] + "</td>\
							<td>" + item["locationId"] + "</td>\
							<td>\
								<button type='button' class='btn btn-warning editDep' data-bs-toggle='modal' data-bs-target='#modDepartment' value='" + item["id"] + "'> Edit </button><br>\
								<button type='button' class='btn btn-danger mt-1 delDep' value='" + item["id"] + "'>Delete</button>\
							</td>\
						</tr>");
				});

				$(".editDep").click(editDepartment);
				$(".delDep") .click(delDepartment);
			}
		});
	}
}

function editDepartment() {
	console.log("editDepartment:", this.value);

	//	skorygować modal:
	$("#modDepartment h5").text("Update department");
	$("#btnDepAdd").text("Update");

	$.post("php/getDepartmentById.php",
		{id: this.value},
		result => {
			// console.log(result.data);
			let rdd = result.data.department;
			let rdl = result.data.location;

			// console.log(rdd);
			// console.log(rdl);

			//	wstrzyknąć dane:
			// console.log($("#modDepartment input"));
			$("#modDepartment #id")  .val(rdd.id);
			$("#modDepartment #name").val(rdd.name);
			let sel = $("#modDepartment select");
			sel.empty();
			rdl.forEach(item => sel.append(new Option(item["name"], item["id"])));
			sel.val(rdd.locationId);
		}
	);
}

function delDepartment() {
	console.log("delDepartment:", this.value);	//	'value' to atrybut elementu html

	$.post("php/delDepartment.php", {id: this.value}, result => {
		if (result.status.code == 200) {
			//console.log(result);
			//console.log(this);		//	tak, zwraca wciśnięty <button>
			//console.log($(this));	//	zwraca Object {}
			//console.log($(this).parent());	//	td
			//console.log($(this).parent().parent());	//	tr

			$(this).parent().parent().remove();
			$("div.alert-success").toggleClass("visually-hidden");
		} else {
			// console.log("Error:", result.status.description);

			$("div.alert-danger").toggleClass("visually-hidden");
		}
	});
}

//	======================= LOCATIONS ===========================
function loadLocations() {
	if (!$("#btnLocations").hasClass("collapsed")) {
		console.log("Load Locations:");

		$("#locations").empty();
		$.get("php/getAllLocations.php", result => {
			// console.log(result);

			if (result.status.code == 200) {
				// console.log(result.data);
				result.data.forEach(item => {
					$("#locations").append(
						"<tr>\
							<td>" + item["id"] + "</td>\
							<td>" + item["name"] + "</td>\
							<td><button type='button' class='btn btn-warning editLoc' data-bs-toggle='modal' data-bs-target='#modLocation' value='" + item["id"] + "'>Edit</button></td>\
							<td><button type='button' class='btn btn-danger delLoc' value='" + item["id"] + "'>Delete</button></td>\
						</tr>"
						/*"<div class='row row-cols-1 row-cols-md-4 g-2 g-md-3'>\
							<div class='col'>\
								<div class='card'>\
									<div class='card-header'>\
										" + item["id"] + " " + item["name"] 
									+ "</div>\
									<ul class='list-group list-group-flush'>\
					  				<li class='list-group-item'>\
										<button type='button' class='btn btn-warning editLoc' data-bs-toggle='modal' data-bs-target='#modLocation' value='" + item["id"] + "'>Edit</button>\
										<button type='button' class='btn btn-danger delLoc' value='" + item["id"] + "'>Delete</button>\
									</li>\
									</ul>\
								</div>\
							</div>\
						</div>"*/
						/*"<table id='tab' class='table table-striped table-hover table-info'>\
							<tbody>\
								<tr>\
									<td><span>ID:</span><br>" + item["id"] + "</td>\
									<td><span>LOCATION:</span><br>" + item["name"] + "</td>\
								</tr>\
								<tr>\
									<td><button type='button' class='btn btn-warning editLoc' data-bs-toggle='modal' data-bs-target='#modLocation' value='" + item["id"] + "'>Edit</button></td>\
									<td><button type='button' class='btn btn-danger delLoc' value='" + item["id"] + "'>Delete</button></td>\
								</tr>\
							</tbody>\
						</table>"*/);
				});

				$(".editLoc").click(editLocation);
				$(".delLoc") .click(delLocation);
			}
		});
	}
}

function editLocation() {
	console.log("editLocation:", this.value);

	//	skorygować modal:
	$("#modLocation h5").text("Update location");
	$("#btnLocAdd").text("Update");

	$.post("php/getLocationById.php",
		{id: this.value},
		result => {
			// console.log(result.data);
			let rd = result.data;

			//	wstrzyknąć dane:
			// console.log($("#modLocation input"));
			$("#modLocation #id")  .val(rd.id);
			$("#modLocation #name").val(rd.name);
		});
}

function delLocation() {
	console.log("deleteLocation:", this.value);	//	'value' to atrybut elementu html

	$.post("php/delLocation.php", {id: this.value}, result => {
		if (result.status.code == 200) {
			//console.log(result);
			//console.log(this);		//	tak, zwraca wciśnięty <button>
			//console.log($(this));	//	zwraca Object {}
			//console.log($(this).parent());	//	td
			//console.log($(this).parent().parent());	//	tr

			$(this).parent().parent().remove();
			$("div.alert-success").toggleClass("visually-hidden");
		} else {
			// console.log("Error:", result.status.description);

			$("div.alert-danger").toggleClass("visually-hidden");
		}
	});
}

//	WARNINGS:
//	rzuca błędami przy rozwijaniu Employee, co uniemożliwia sprawdzenie edit'a
//	co to za identyfikatory: collapseExample? collapseExample1? tab?
//	buttony bez atrybutu id!
//	usystematyzować i uzupełnić id:
//	- modal'i: collapseExample collapseExample1 collapseExample2, etc
//	- button'ów: add/edit/del + Emp/Dep/Loc
//	- select'ów: ?
//	Stasiak! ale ty jesteś odpierdalacz! ;-DDD	spójrz na linijkę z klawiszem edit dla Employee - 800 znaków - masakra!!!
//	, notabene to tam się wykłada bs
//	l.82: od kiedy to się wstawia div i button do tabeli co???
//	button type=submit !!
//	input type=search ???
//	po chuj </br> przed search'em???? ile ja się napociłem dlaczego .prev() nie działa!

//	!w Departamentach nie ma lokalizacji, jest tylko jakieś GÓWNO!!!
//	!nie generować nowego rządania przy dodawaniu a zwracać zaktualizowaną zawartość!
//	Jak włączyć modala dla Edycji???
//	!Nie działają modale dla edycji Departments i Locations!

//	z getXxxById.php i getAllxxx zrobić jeden skrypt
//	z Add & Update też zrobić jeden skrypt
