/* Handler to add a new user
	Calls insert_user.php to dump item in DB
*/

var insert_user = function() {
    //The form in the HTML
    const createUserForm = document.getElementById("createUserForm");

    //When the user submits the form (clicks the button)
    createUserForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (document.getElementById("CPass").value != document.getElementById("Pass").value) {
            document.getElementById("CPass").focus();
            document.getElementById("CPass").select();
            alert("Passwords do not match.");
        }
        else {

            //This is the backend file inserting in the DB
            const php = "php/insert_user.php";

            //This is what we send to the server for the PHP file
            const xhr = new XMLHttpRequest();
            let formData = new FormData(createUserForm);

            var userRaw = new Array();

            //Connect to the PHP
            xhr.open("POST", php, true);
            xhr.onreadystatechange = function () {
                console.log('readyState: ' + xhr.readyState);
                console.log('status: ' + xhr.status);
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Everything ok, get the response
                    console.log(xhr.responseText);

                    userRaw = JSON.parse(xhr.responseText)

                    //Check if the username exists, if we got an ID back from the DB
                    if (userRaw[0].ID) {
                        //Yes, then set this user ID in the local storage
                        window.localStorage.setItem('PMUser', userRaw[0].ID);
                    }
                    //If the user does not exist, nothing happens, so the app state remains the same

                    //In any case, we reset the UI to either show the userSpace or the appSpace
                    resetUI();
                    //And we load the tasks
                    //select_pending();
                    //select_completed();
                }
            };
            xhr.send(formData);
        }
    });
};
insert_user();
