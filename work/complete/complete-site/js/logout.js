console.log("js/logout.js is loaded");

const logout = document.querySelector("#logout");
logout.addEventListener("click", signOut);

function signOut(event) {
  event.preventDefault();
  window.localStorage.clear();
  window.location.href = "index.html";
}
