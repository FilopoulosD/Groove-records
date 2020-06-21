function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("home").style.opacity = 0;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("home").style.opacity = 1;

}


function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

// Add click event dynamically
$(document).on("click", ".toggle-text-button", function() {

    // Check if text is more or less
    if ($(this).text() == "Read More") {

        // Change link text
        $(this).text("Read Less");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide down
        $(this).parent().children(".toggle-text").slideDown();

    } else {


        // Change link text
        $(this).text("Read More");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide up 
        $(this).parent().children(".toggle-text").slideUp();

    }

});