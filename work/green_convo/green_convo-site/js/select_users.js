/* Handler for the display of names entered in the DB
	Uses the var itemRaw which comes json-encoded from the DB through select_names.php
*/

var select_users = function () {
  //This is the backend file connecting to the DB
  const php = "php/select_users.php";

  //Handles the server call to the PHP file and the data we get back
  const xhr = new XMLHttpRequest();

  //EXCLUDE CURRENT USER FROM LIST
  let formData = new FormData();
  formData.append("user_current", window.localStorage.getItem("user_current"));

  //Will contain the raw data from the DB
  let itemRaw = [];

  //Connect to the PHP
  xhr.open("POST", php, true);
  xhr.onreadystatechange = function () {
    //This is stuff to tell us what is going on
    console.log("readyState: " + xhr.readyState);
    console.log("status: " + xhr.status);
    if (xhr.readyState == 4 && xhr.status == 200) {
      //Everything ok, get the names in JSON
      itemRaw = JSON.parse(xhr.responseText);
      //console.log(itemRaw); // print response

      //The HTML container for the list of names
      let container = document.getElementById("listContainer");

      //Clean up the html
      container.innerHTML = "";

      //Dump items in the DOM
      for (let c in itemRaw) {
        //c contains every user found, one at a time
        //console.log(itemRaw[c]);

        //Container div for each person
        let userDIV = document.createElement("div");
        let Last = document.createElement("p");
        let Alias = document.createElement("p");
        Last.classList.add("date");
        Alias.classList.add("alias");

        //Last login complete date
        let LastLogin = new Date(itemRaw[c].LastLogin);

        //Setup links for each user
        Last.innerHTML = LastLogin;
        Alias.innerHTML = itemRaw[c].Alias;
        userDIV.addEventListener("click", function () {
          window.localStorage.setItem("user_partner", itemRaw[c].ID);
          window.location.href = "convo.html";
        });

        //Dump the link in the container
        userDIV.appendChild(Alias);
        userDIV.appendChild(Last);
        container.appendChild(userDIV);
      }
    }
  };
  xhr.send(formData);
};
if (window.localStorage.getItem("user_current") == null) {
  window.location.href = "index.html";
} else {
  select_users();
}
