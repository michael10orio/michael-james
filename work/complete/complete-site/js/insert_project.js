/* Handler to add a new project
	Calls insert_project.php to dump item in DB
*/

var insert_project = function() {
    //The form in the HTML
    const addForm = document.getElementById("addProjectForm");

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/insert_project.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);
        //Add the user id from localstorage to the form data sent to the PHP
        formData.append("UserID",window.localStorage.getItem("PMUser"));

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                console.log(xhr.responseText);

                resetUI();
                // Call a refresh of the list of names
                //select_pending();
                //select_completed();
            }
        };
        xhr.send(formData);
    });
};
insert_project();
