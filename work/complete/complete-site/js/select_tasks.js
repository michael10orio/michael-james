/* Handler for the display of completed tasks from the DB
	Uses the var itemRaw which comes json-encoded from the DB through select_completed.php
*/

var select_tasks = function () {

	//This is the backend file connecting to the DB
	const php = "php/select_tasks.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Send the current user’s ID
	var formData = new FormData();
	formData.append("ProjectID",window.localStorage.getItem("PMProj"));

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
			let tasksList = document.getElementById('tasksList');
			//Clean up the html
			tasksList.innerHTML = "";
			
			//Dump items in the DOM
			for (let c in itemRaw) {
				//c contains every project found, one at a time
				console.log(itemRaw[c]);

				//Container LI for each task
				let task = document.createElement('li');
				let taskDescription = document.createElement('p');
				taskDescription.innerHTML = itemRaw[c].Description;
				let taskDeadline = document.createElement('p');
				taskDeadline.innerHTML = itemRaw[c].Deadline;

				let taskBttn = document.createElement('button');
				taskBttn.innerHTML = "Complete";

				taskBttn.addEventListener("click", function () {
					update_task(itemRaw[c].ID);
					resetUI();
				});

				//Organize the structure and dump in html
				task.appendChild(taskDescription);
				task.appendChild(taskDeadline);
				task.appendChild(taskBttn);
				tasksList.appendChild(task);
			}
        }
	};
	xhr.send(formData);
};


