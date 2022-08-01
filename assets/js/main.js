//********** CREATE DATA ELEMENTS : PREVIEW, CHARACTERS, WORKS
import data from "../data/art.js";
let slideLinks = data["preview"];
let charLinks = data["characters"];
let workLinks = data["works"];
let slideshowElm = document.getElementById("slideshow").innerHTML
let charElm = "";
let workElm = "";

let source = "./assets/data/art/";

//PREVIEW ELEMENT
for(let i=0; i<slideLinks.length;i++){
    let item =
        `<div class="slide">
            <img class="foreground" src="${source}${slideLinks[i]}"/>
            <img class="background" src="${source}${slideLinks[i]}"/>
        </div>`;
    slideshowElm += item;
}
//CHARACTER CATALOG ELEMENT
// for(let i=0; i<charLinks.length;i++){
//     let item = ``;
//     charElm += item;
// }
//WORKS ELEMENT
for(let i=0; i<workLinks.length;i++){
    let item = `<img src="${source}${workLinks[i]}"/>`;
    workElm += item;
}
document.getElementById("slideshow").innerHTML = slideshowElm;
// document.getElementById("catalog-container").innerHTML = charElm;
document.getElementById("works").innerHTML = workElm;

//********** CREATE NAVBAR : open and close the navigation in mobile mode
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

//********** SLIDESHOW AUTOMATION
let slideIndex = 0;

//CREATE DOTS
let dotsElm;
let dot;
let parentDiv = document.createElement("div");
parentDiv.className = "slideshow-traverser";
for(let i=0; i<document.getElementsByClassName("slide").length; i++){
    dot = document.createElement("span");
    dot.className = "dot";
    parentDiv.appendChild(dot);
}
document.getElementById("this").appendChild(parentDiv);

//SHOW SLIDES
await showSlides();
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); //200ms = 2s
}