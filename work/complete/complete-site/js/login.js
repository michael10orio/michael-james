/* Handler for the user log in
	Collects creds and calls login.php to validate creds
	Sets the localStorage values for user
*/

//The login forms
var loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', function(event) {
	event.preventDefault();

	var php = "php/login.php";

	var xhr = new XMLHttpRequest();
	var formData = new FormData(loginForm);
	var userRaw = new Array();

	console.log(formData);

    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
			// Everything ok, get the user data
			//console.log(xhr.responseText);
			var str = xhr.responseText;
            if (str.match(/^\[/)) { //check that the response is indeed parseable data
				userRaw = JSON.parse(xhr.responseText)
				console.log(userRaw); // handle response.

				//Check if the username exists, if we got an ID back from the DB
				if (userRaw[0].ID) {
					//Yes, then set this user ID in the local storage
					window.localStorage.setItem('PMUser',userRaw[0].ID);
				}
				//If the user does not exist, nothing happens, so the app state remains the same

				//In any case, we reset the UI to either show the userSpace or the appSpace
				resetUI();
				//And we load the tasks
				//select_pending();
				//select_completed();
			}
			else {
				console.log(xhr.responseText);
				//--> perhaps set a user error notice in the html
			}

        }
	};
	xhr.send(formData);
});

