//NAVBAR : Open and close the navigation in mobile mode
var navLinks = document.getElementById("navLinks");
function toggleMenu(){ 
    if(navLinks.style.width == "0vw")
    {
        navLinks.style.width = "100vw";
    }
    else
    {
        navLinks.style.width = "0vw";
    }
}

//Slideshow
let slideIndex = 0;
showSlides();
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    console.log(slides);

    let dots = document.getElementsByClassName("dot");
    console.log(dots);
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    console.log(slideIndex);
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); //200ms = 2s
}