/* Handler for the display of completed tasks from the DB
	Uses the var itemRaw which comes json-encoded from the DB through select_completed.php
*/

var select_projects = function () {

	//This is the backend file connecting to the DB
	const php = "php/select_projects.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Send the current user’s ID
	var formData = new FormData();
	formData.append("UserID",window.localStorage.getItem("PMUser"));

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
			console.log(itemRaw); // print response

			//The HTML container for the list of names
			let projectsNav = document.getElementById('projectsNav');
			//Clean up the html
			projectsNav.innerHTML = "";
			
			//Dump items in the DOM
			for (let c in itemRaw) {
				//c contains every project found, one at a time
				console.log(itemRaw[c]);

				//Container LI for each task
				let proj = document.createElement('li');
				proj.innerHTML = itemRaw[c].Title;

				let currentProj = window.localStorage.getItem("PMProj");
				if (itemRaw[c].ID == currentProj) {
					proj.classList.add("current");
				}

				proj.addEventListener("click", function () {
					select_project_details(itemRaw[c].ID);
					resetUI();
				});

				//Organize the structure and dump in html
				projectsNav.appendChild(proj);
			}
        }
	};
	xhr.send(formData);
};
select_projects();

