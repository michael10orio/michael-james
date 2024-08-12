/* Handler for the display of the conversation
	Uses the var itemRaw which comes json-encoded from the DB through select_messages.php
*/

var select_messages = function () {
  //This is the backend file connecting to the DB
  const php = "php/select_messages.php";

  //Handles the server call to the PHP file and the data we get back
  const xhr = new XMLHttpRequest();

  //Send the users for the conversation to the PHP
  let formData = new FormData();
  formData.append("user_current", window.localStorage.getItem("user_current"));
  formData.append("user_partner", window.localStorage.getItem("user_partner"));

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
      let container = document.getElementById("messagesContainer");
      //Clean up the html
      container.innerHTML = "";

      //Dump items in the DOM
      for (let c in itemRaw) {
        //c contains every user found, one at a time
        console.log(c);

        /* I’ve left the code here because there are many elements to it
				   But you need to customize this, and make it work the way you want
				   Especially, you need to design the way each message looks: content, timestamp, etc.
				   */
        //Container for each message, for content and for timestamp
        let messageDIV = document.createElement("div");
        let messageConvo = document.createElement("p");
        let messageDate = document.createElement("h2");

        //If the message is from user_current, add a class to it so we can make it look different
        if (
          itemRaw[c].From_Client == window.localStorage.getItem("user_current")
        ) {
          messageDIV.classList.add("from");
        }
        if (
          itemRaw[c].To_Client == window.localStorage.getItem("user_partner")
        ) {
          messageDIV.classList.add("new");
        }

        //Insert the values from the DB in the HTML elements
        messageConvo.innerHTML = itemRaw[c].Convo;
        messageDate.innerHTML = itemRaw[c].Date.substring(11);

        //Dump the message in the container
        messageDIV.appendChild(messageConvo);
        messageDIV.appendChild(messageDate);
        container.appendChild(messageDIV);
      }
    }
  };
  //xhr.send();
  xhr.send(formData);
};
if (window.localStorage.getItem("user_current") == null) {
  window.location.href = "index.html";
} else if (window.localStorage.getItem("user_partner") == null) {
  window.location.href = "list.html";
} else {
  select_messages();
}

//Optional automatic refresh of messages, just un comment the block below
/*
let refresh = setInterval(function() {
	select_messages();
},10000); //10 seconds
*/
