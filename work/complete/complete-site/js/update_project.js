/* Handler to add archive a project
	Calls update_project.php
*/

var update_project = function() {
        //This is the backend file updateing in the DB
        const php = "php/update_project.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData();
        //Add the task’s ID to be sent to the PHP
        formData.append("ProjectID",window.localStorage.getItem("PMProj"));

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                console.log(xhr.responseText);

                window.localStorage.removeItem("PMProj");
                resetUI();
            }
        };
        xhr.send(formData);
};
document.getElementById("archiveBttn").addEventListener("click",update_project);