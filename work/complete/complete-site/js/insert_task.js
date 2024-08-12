/* Handler to add a new task
	Calls insert_task.php to dump item in DB
*/

var insert_task = function() {
    //The form in the HTML
    const addForm = document.getElementById("addTaskForm");

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/insert_task.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);
        //Add the user id from localstorage to the form data sent to the PHP
        formData.append("ProjectID",window.localStorage.getItem("PMProj"));

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                console.log(xhr.responseText);

            }
            resetUI();
        };
        xhr.send(formData);
    });
};
insert_task();
