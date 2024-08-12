// Get the modal
var modal = document.getElementById("mypreview");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myphoto");
var viewImg = document.getElementById("photo");
var captionText = document.getElementById("caption");
img.onclick = function(){
  view.style.display = "block";
  viewImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}