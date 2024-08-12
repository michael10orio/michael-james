/* Handler for log in
	Checks with the DB through login.php
	Sets the localstorage values for alias and id
*/

const login = function () {
  //The form in the HTML
  const loginForm = document.getElementById("loginForm");

  //Will contain the raw data from the DB
  let itemRaw = [];

  //When the user submits the form (clicks the button)
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //This is the backend file inserting in the DB
    const php = "php/login.php";

    //This is what we send to the server for the PHP file
    const xhr = new XMLHttpRequest();
    let formData = new FormData(loginForm);

    //Connect to the PHP
    xhr.open("POST", php, true);
    xhr.onreadystatechange = function () {
      console.log("readyState: " + xhr.readyState);
      console.log("status: " + xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        itemRaw = JSON.parse(xhr.responseText);

        //Get the user details
        itemRaw = JSON.parse(xhr.responseText);
        console.log(itemRaw); // print response

        //Set the local storage
        window.localStorage.setItem("user_current", itemRaw[0].ID);

        //Navigate to the list of users
        window.location.href = "list.html";
      }
    };
    xhr.send(formData);
  });
};
if (window.localStorage.getItem("user_current") == null) {
  login();
} else {
  window.location.href = "list.html";
}
