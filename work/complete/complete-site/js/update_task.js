/* Handler to add update a task, set it as completed
	Calls update_task.php to dump item in DB
*/

var update_task = function(TaskID) {
        //This is the backend file updateing in the DB
        const php = "php/update_task.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData();
        //Add the task’s ID to be sent to the PHP
        formData.append("TaskID",TaskID);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                console.log(xhr.responseText);

                resetUI();
            }
        };
        xhr.send(formData);
};
