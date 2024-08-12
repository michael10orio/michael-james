/* Handler for the display of details about a project
	Uses the var itemRaw which comes json-encoded from the DB through select_project_details.php
*/

var select_project_details = function (ProjectID) {

	//Store the project ID in the localStorage
	window.localStorage.setItem("PMProj",ProjectID);

	//This is the backend file connecting to the DB
	const php = "php/select_project_details.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Send the current user’s ID
	var formData = new FormData();
	formData.append("ProjectID",ProjectID);

	//Will contain the raw data from the DB
	let itemRaw = [];

	//Connect to the PHP
    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        //This is stuff to tell us what is going on
    	console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            //Everything ok, get the names in JSON
            itemRaw = JSON.parse(xhr.responseText);
			console.log(itemRaw[0]); // print response

			document.getElementById('projectTitle').innerHTML = itemRaw[0].Title;
			document.getElementById('projectDescription').innerHTML = itemRaw[0].Description;

			//Get the tasks related to this project
			select_tasks();

        }
	};
	xhr.send(formData);
};

