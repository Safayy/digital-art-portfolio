//********** CREATE DATA ELEMENTS : PREVIEW, CHARACTERS, WORKS
import data from "../data/art.js";
let source = "./assets/data/art/";
let slideLinks = data["preview"];
let charData = data["characters"];
let workLinks = data["works"];

//PREVIEW ELEMENT
let slideshowElm = document.getElementById("slideshow").innerHTML; /* SINCE THIS HAS SOME DEFAUT IMAGE */
for(let i=0; i<slideLinks.length;i++){
    let item =
        `<div class="slide">
            <img class="foreground" src="${source}${slideLinks[i]}"/>
            <img class="background" src="${source}${slideLinks[i]}"/>
        </div>`;
    slideshowElm += item;
}
//CHARACTER CATALOG ELEMENT
console.log(charData);
let Chars = document.createElement("div");
Chars = charData.forEach( (item) => Char());

function Char(){
    //Retreive Character Attributes
    let name = "Rebecca White" 
    let faceLink = "char-face.png"
    let bodyLink = "char-body.png"
    let story = "adsjfkladjs alksdjfkl laksdjfkl adjsf .. kalsdfj weijr adksf"
    let customTags = {"dob":"23/3/3"}

    //





    //return charItem
    
}

// charData.forEach((char => function{
//     console.log("a character! "));
// });

//Adopt Click
function adoptChar(){
    console.log("adopted!");
}

//CREATE 
let charItem = document.createElement("div");
let charName = document.createElement("h3");
let charContent = document.createElement("div");
let charLeft = document.createElement("div");
    let charFace = document.createElement("img");
    let charStoryHeading = document.createElement("h4");
    let charStoryText = document.createElement("p");
let charRight = document.createElement("div");
    let charBody = document.createElement("img");
    let sPrompt = document.createElement("span");
    let sAnswer = document.createElement("span");
let charAdoptBtn = document.createElement("button");

//SET STYLE
charItem.className = "char-item";
charName.className= "char-name";
charContent.className = "char-content";
charLeft.className = "char-left";
charRight.className = "char-right";
charBody.className = "char-body";
sPrompt.className = "prompt";
sAnswer.className = "answer";
charAdoptBtn.className = "adopt-btn";

//SET ACTION LISTENER
charAdoptBtn.onclick = adoptChar;

//SET TEXT
charName.innerText = "Rebecca White";
charFace.src = `${source}char1-face.png`;
charBody.src = `${source}char1-body.png`;
console.log(charFace.src)
console.log(charBody.src)
charStoryHeading.innerText = "Story";
charStoryText = "Est consectetur labore dolor cupidatat ex est qui laborum laborum in duis aliquip nostrud. Eu nulla ad excepteur dolor nostrud amet elit sunt incididunt cupidatat excepteur";
sPrompt.innerText = "DOB:";
sAnswer.innerText = "15/5/54";
charAdoptBtn.innerText= "Adopt";

//ARRANGE
charLeft.append(...[
    charFace,
    charStoryHeading,
    charStoryText
]);
charRight.append(...[
    charBody,
    sPrompt,
    sAnswer
]);
charContent.append(...[
    charLeft,
    charRight
]);
charItem.append(...[
    charName,
    charContent,
    charAdoptBtn
]);


document.getElementById("catalog-container").appendChild(charItem);




        

//WORKS ELEMENT
let workElm = "";
for(let i=0; i<workLinks.length;i++){
    let item = `<img src="${source}${workLinks[i]}"/>`;
    workElm += item;
}
document.getElementById("slideshow").innerHTML = slideshowElm;
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
parentDiv.className = "slideshow-traverser"; /* optional */
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