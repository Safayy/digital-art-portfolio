//********** CREATE DATA ELEMENTS : PREVIEW, CHARACTERS, WORKS
import data from "/assets/data/art.js";
let source = "/assets/data/art/";
console.log(data);
console.log(source);

let slideLinks = data["preview"];
let charData = data["characters"];
let workLinks = data["works"];

//PREVIEW ELEMENT
let slideshowElm = document.getElementById("slideshow").innerHTML; /* SINCE THIS HAS SOME DEFAUT IMAGE */
for(let i=0; i<slideLinks.length;i++){
    let item =
        `<div class="slide">
            <img class="foreground unselectable" src="${source}${slideLinks[i]}"/>
            <img class="background unselectable" src="${source}${slideLinks[i]}"/>
        </div>`;
    slideshowElm += item;
}
//CHARACTER CATALOG ELEMENT
let charsContainer = document.createElement("div");
charsContainer.className = "catalog-container";
let chars = [];
for(let i=0; i<charData.length; i++){
    let cChar = charData[i];
    charsContainer.appendChild(char(
        cChar["name"], cChar["faceLink"], cChar["bodyLink"], cChar["story"], cChar["customTags"],  
    ));
};

document.getElementById("catalog-container").appendChild(charsContainer);

function char(name, faceLink, bodyLink, story, customTags){
    //Adopt Click
    function adoptChar(){
        var href = "#commisionSection"
        window.location=href;
        document.getElementById("adoptCharacter").checked = true;
        document.getElementById("description").innerText = `Character = ${charName.innerText}`;
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
    charFace.className = "unselectable";
    charBody.className = "unselectable";
    sPrompt.className = "prompt";
    sAnswer.className = "answer";
    charAdoptBtn.className = "adopt-btn";

    //SET ACTION LISTENER
    charAdoptBtn.onclick = adoptChar;

    //SET TEXT
    charName.innerText = name;
    charFace.src = `${source}${faceLink}`;
    charBody.src = `${source}${bodyLink}`;
    charStoryText = story;
    charStoryHeading.innerText = "Story";
    charAdoptBtn.innerText= "Adopt";

    let sHolder = document.createElement("p");
    for(let key in customTags){
        sHolder.innerHTML += `<span class="prompt">${key}:</span><span class="answer">${customTags[key]}</span></br>`;
        // console.log(key + " | " + );

    }

    sPrompt.innerText = "DOB:";
    sAnswer.innerText = "15/5/54";

    //ARRANGE
    charLeft.append(...[
        charFace,
        charStoryHeading,
        charStoryText
    ]);
    charRight.append(...[
        charBody,
        sHolder
        // sPrompt,
        // sAnswer
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

    return charItem;
}

//WORKS ELEMENT
let workElm = "";
for(let i=0; i<workLinks.length;i++){
    let item = `<img class="unselectable" src="${source}${workLinks[i]}"/>`;
    workElm += item;
}
document.getElementById("slideshow").innerHTML = slideshowElm;
document.getElementById("works").innerHTML = workElm;

//********** CREATE NAVBAR : open and close the navigation in mobile mode
let navBar = document.getElementById("navbar");
let navOpen = document.getElementById("nav-open");
let navClose = document.getElementById("nav-close");
const mql = window.matchMedia('(max-width: 700px)');
mql.onchange = (e) => setNavStyle(e);

navBar.style.display = "none";
navClose.style.display = "none";

window.onload = function() {
    navOpen.onclick = toggleMenu;
    navClose.onclick = toggleMenu;
    document.getElementById("submitFormBtn").onclick = submitForm;
};
setNavStyle(window.matchMedia('(max-width: 700px)'));

function setNavStyle(e){
    if (!e.matches) { //Desktop view: Show navbar 
        navBar.style.display = "block";
    } else {//Mobile view: Show button, Hide navbar
        navBar.style.display = "none";
        navOpen.style.display = "block";
        navClose.style.display = "none";
  }
}

function toggleMenu(){ 
    if (navBar.style.display == "none") { //Open condition
        console.log("opened") 
        navBar.style.display = "block"; 
        navOpen.style.display = "none";
        navClose.style.display = "block";
    } else { //Closed condition
        console.log("closed") 
        navBar.style.display = "none";
        navOpen.style.display = "block";
        navClose.style.display = "none";
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
document.getElementById("slideshow-traverser").appendChild(parentDiv);

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

//Respond form

function submitForm(){
    let type = document.querySelector('input[name="requestType"]:checked');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    // let imageSample = document.getElementById('imageSample');
    let description = document.getElementById('description');
    let responseText = document.getElementById('responseText');

    //Verify that no necessary inputs are null
    responseText.innerHTML = "";
    responseText.classList.add("errorText");
    console.log(responseText)
    if (name.value.trim() == "") {
        responseText.innerHTML += "* Please enter your name<br/>";
     }
    if (email.value.trim() == "") {
        responseText.innerHTML += "* Please enter your email<br/>";
    }
    if (description.value.trim() == "") {
        responseText.innerHTML += "* Please enter a description<br/>";
    }
    if(responseText.innerHTML != "")
        return false;

    //Build email
    let emailText =
    `Dear ${name.value},<br><br>
    You're request for a ${type.value} has been sent been received.<br>
    You will receive a response shortly with information on whether your request is accepted and a price quote.<br><br>
    
    Details for your request are below:<br>
    Type = ${type.value}<br>
    Description = ${description.value}<br>
 
    Thank you for the commision request! <3<br><br>

    Sincerely,<br>
    Keyrinq AutoManager`;//   Sample Image = ${imageSample.value}<br><br>
    emailText = emailText.replace(/(\r\n|\n|\r)/gm, "");

    //Send email request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.sendinblue.com/v3/smtp/email");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Api-Key", API-KEY-SENDINBLUE);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    let data = `{  
        "sender":{  
           "name":"Keyrinq",
           "email":"keyrinqart@gmail"
        },
        "to":[  
           {  
              "email":"${email.value}",
              "name":"${name.value}"
           },
           {  
              "email":"keyrinqart@gmail.com",
              "name":"Keyrinq"
           }
        ],
        "subject":"Keyrinq ${type.value}",
        "htmlContent":"<html><head></head><body>${emailText}</body></html>"
    }`;
    
    xhr.send(data); //media attachment?

    // if(xhr.status=="400"){
    //     responseText.innerHTML += "* Invalid email address<br/>";
    //     console.log("RETURNING FALSE")

    //     return false;
    // }

    //On sucessful form submit
    let topElm = document.getElementsByClassName("topPrompt");
    let underElm = document.getElementsByClassName("underPrompt");

    for(let i=0; i<topElm.length; i++)
        topElm[i].style.display = "none";
    for(let i=0; i<underElm.length; i++)
        underElm[i].style.display = "none"; 
    responseText.classList.add("sucessText");
    document.getElementById("form").classList.remove("form");
    responseText.innerHTML = "Commision Request Sucessful";
    document.getElementById("submitFormBtn").style.display = "none";
}

// $.ajax({
//     url: 'https://api.wit.ai/message?v=20140826&q=',
//     beforeSend: function(xhr) {
//          xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
//     }, success: function(data){
//         alert(data);
//         //process the JSON data etc
//     }
// })

//Adopt Character

