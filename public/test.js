function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("home").style.opacity = 0;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("home").style.opacity = 1;

}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const express = require('express')
const router = express.Router()
const Favorite = require('../models/favorite')


function myFunction(artistId) {

    console.log("ere")

    let favorite1 = new Favorite({
        user: "kostas",
        artist: "bob"

    })

    //const newFavorite = await favorite1.save()
    favorite1.save(function(err, doc) {
        alert("123")
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
    });


}

/*
const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
    alert(loool);

  console.log('button was clicked');

  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
*/