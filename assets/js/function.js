/*
Author: Shuying Chen
project 1
*/


/*
constructing all the div tag
*/
const divRetrieve = document.createElement("div");
divRetrieve.id = "result";
document.body.append(divRetrieve);

const divStar = document.createElement("div");
divStar.className = "stars";
divStar.id = "stars";
document.body.append(divStar);

//create 10 div class for the star animation
var htmlElements = "";
for (var i = 0; i < 10; i++) {
  htmlElements += '<div class="star">✨ *★*✨</div>';
}
var container = document.getElementById("stars");
container.innerHTML = htmlElements;


//constructing the main div tag
const divMain = document.createElement("div");
divMain.id = "main";
document.body.append(divMain);

const div2 = document.createElement("div");
div2.id = "createForm";
document.body.append(div2);

const div1 = document.createElement("div");
div1.id = "selects";
divMain.appendChild(div1);

//constructing the button
const divbutton = document.createElement("div");
divbutton.id = "divbutton";
document.body.append(divbutton);

//declare the choice data
var choiceData;
var selectNum = 0;

//Retrieve the storage data from the session storage and print out
if (typeof (Storage) !== "undefined") {//if there is something in the storage
  // Retrieve
  if (sessionStorage.getItem("firstname") != null) {
    document.getElementById("result").innerHTML = "Welcome back " + sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    divRetrieve.append(document.createElement('br'));

    //print out user last choice
    divRetrieve.append("Your last choice is " + sessionStorage.getItem("choice3") + ", " + sessionStorage.getItem("choice2") + ", " + sessionStorage.getItem("choice1"));
    divRetrieve.append(document.createElement('br'));

    //print out user's final result 
    divRetrieve.append("Your movie is    [" + sessionStorage.getItem("movieName") + "]");
  }
  else {
    //if there is no information stored in the storage, print out welcome
    document.getElementById("result").innerHTML = "Welcome";
  }

}
//if user's browser did not support web
else {
  document.getElementById("result").innerHTML = "the browser does not support Storage";
}


//start creating the selection
var option = { value: "choices" };
createSelect(option);

/*
create the options base from the selection

*/
function createSelect(selectOptions) {
  clearData();
  if (selectOptions.value != 'choices') {
    //if user are change their options, the selection options will remove the options
    while (selectOptions.parentNode.lastChild != selectOptions) {
      selectOptions.parentNode.removeChild(selectOptions.parentNode.lastChild);
    }
  }

  choiceData = selectInfo[selectOptions.value];

  if (choiceData != null) {
    const selectList = document.createElement('select');
    selectList.addEventListener("change", function () {
      createSelect(selectList);
    });

    //create h2 elements for the questions
    var h2 = document.createElement('h2');
    var text = document.createTextNode(choiceData[0]);
    h2.appendChild(text);
    document.getElementById('selects').appendChild(h2);

    //create options base on the data
    var option = document.createElement('option');
    selectList.appendChild(option);

    //for loop, get set the id and create the elements for the options
    for (var i = 1; i < choiceData.length; i++) {
      var tag = document.createElement('option');
      tag.value = choiceData[i];
      tag.id = choiceData[i];
      selectList.id = i - 1;
      selectList.className = i;
      tag.appendChild(document.createTextNode(choiceData[i]));
      selectList.appendChild(tag);
      text = choiceData[i - 1];
    }


    //create h2 to put the select on the page
    document.getElementById('selects').appendChild(selectList);
    var output = document.createElement('h3');
    document.getElementById('selects').appendChild(output);
  }
  //set the submit button to disable to false
  else {
    document.getElementById("btnsubmit").disabled = false;
  }

}//end of creating selection and options


//create element p for the result
var result = document.createElement("p");

//Create form
const form = document.createElement("form");

//create input for user firstname
var fname = document.createTextNode("First Name:");
form.appendChild(fname);
var inputFirstname = document.createElement("input");
inputFirstname.setAttribute('name', "firstname");
inputFirstname.id = "firstname";
form.appendChild(inputFirstname);

//create the breakline in between 
const lineBreak = document.createElement('br');
form.appendChild(lineBreak);


//create input for user lastname
var lname = document.createTextNode("Last Name:");
form.appendChild(lname);
var inputLastname = document.createElement("input");
inputLastname.setAttribute('name', "lastname");
inputLastname.id = "lastname";
form.appendChild(inputLastname);

//add form to the created form
document.getElementById("createForm").appendChild(form);


//create button for submit the select
const button2 = document.createElement("button");
button2.id = "btnsubmit";
button2.type = "button";
document.getElementById("divbutton").appendChild(button2); // add button
var submitbutton = document.createTextNode("Submit");
button2.append(submitbutton);

//set the disable to true
document.getElementById("btnsubmit").disabled = true;

//when user click the submit button, go to the validate form
document.getElementById("btnsubmit").addEventListener("click", validateForm);



function validateForm() {
  //make sure the user is enter something for the name

  if (inputFirstname.value.trim().length == 0) {
    alert("Please enter your first name");
  }
  else if (inputLastname.value.trim().length == 0) {
    alert("Please enter your last name");
  }

  else {
    //if user pass the validation, bring to myfunction for the result output
    myFunction();
  }
}

//user can click the button for clear the local and session data
function clearData() {
  //create button for clear
  const btnClear = document.createElement("button");
  btnClear.id = "cleardata";
  btnClear.type = "button";
  var cleartext = document.createTextNode("Clear Storage");
  btnClear.append(cleartext);
  divRetrieve.append(btnClear);
  btnClear.addEventListener('click', function () {
    alert("Your local and session storage is clear");
    sessionStorage.clear();
    localStorage.clear();
  })
}


//this function is use to storage the data to the local and session storage
function storeData() {
  //get user's name
  var firstname = document.getElementById("firstname");
  var lastname = document.getElementById("lastname");

  //get their options
  let x1 = document.getElementById("1");
  let i1 = x1.selectedIndex;
  choice1 = x1.options[i1].text;

  let x2 = document.getElementById("2");
  let i2 = x1.selectedIndex;
  var choice2 = x2.options[i2].text;

  let x3 = document.getElementById("3");
  let i3 = x1.selectedIndex;
  var choice3 = x3.options[i3].text;

  //set the local storage items
  localStorage.setItem('firstname', firstname.value);
  localStorage.setItem('lastname', lastname.value);
  localStorage.setItem('choice1', choice1);
  localStorage.setItem('choice2', choice2);
  localStorage.setItem('choice3', choice3);
  localStorage.setItem('movieName', text);

  //set the session storage items
  sessionStorage.setItem('firstname', firstname.value);
  sessionStorage.setItem('lastname', lastname.value);
  sessionStorage.setItem('choice1', choice1);
  sessionStorage.setItem('choice2', choice2);
  sessionStorage.setItem('choice3', choice3);
  sessionStorage.setItem('movieName', text);


  const firstnameStorage = firstname.value;
  const lastnameStorage = lastname.value;

  //get the console log
  console.log(firstnameStorage);
  console.log(lastnameStorage);
  console.log(choice1);
  console.log(choice2);
  console.log(choice3);
  console.log(text);
}//end of store data

//this function is use to get the result of based on the user input
function createResult() {
  //create div tag
  const bottom = document.createElement("div");
  bottom.id = "bottom";
  document.body.append(bottom);

  //get the result text
  const selectResults = document.createElement("p");
  selectResults.id = "textResults";
  bottom.appendChild(selectResults);

  const selectResult = document.createElement("h4");
  selectResult.id = "textResult";
  bottom.appendChild(selectResult);

  //insert the image
  const imageResult = document.createElement("p");
  imageResult.id = "imageResult";
  bottom.appendChild(imageResult);

  //create a gallery for display all the movie poster
  const gallery = document.createElement('h4');
  const galleryText = document.createTextNode("Here is all the movie!");
  gallery.appendChild(galleryText);
  document.body.append(gallery);

  const overview = document.createElement("div");
  overview.id = "imageOverview";
  document.body.append(overview);

  const slide = document.createElement("img");
  slide.id = "slideshow";
  overview.appendChild(slide);

}


//Save the size of array
var arraySize = imageArray.length;
var x = 1;

//Function runImage display the slideshow for the movie poster
function runImage() {
  document.getElementById('slideshow').src = imageArray[x];
  x++;

  //infinitely repeat the display
  if (x === arraySize) {
    x = 0;
  }
}


function myFunction() {
  //call the create result function
  createResult();
  //call the display image function
  setInterval(runImage, 2000);

  //set the submit button disable to true
  document.getElementById("btnsubmit").disabled = true;

  //once user submit their options, all the options are disabled
  document.getElementById("1").disabled = true;
  document.getElementById("2").disabled = true;
  document.getElementById("3").disabled = true;

  //get the final result
  var x = document.getElementById("1");
  var i = x.selectedIndex;
  document.getElementById("textResult").innerHTML = x.options[i].text;

  //create h3 for display the result
  var newoutput = document.createElement('h3');
  var resultmovie = x.options[i].text;
  var print = document.createTextNode("Your choice is " + resultmovie);
  newoutput.appendChild(print);
  document.getElementById('textResults').appendChild(newoutput);
  document.getElementById('textResult').innerHTML = ResultData[resultmovie];
  text = ResultData[resultmovie];

  //depend on the user input adding adding the image by call the addimage function
  addImage();

  //store all the data to storage
  storeData();

  //change the background image 
  document.body.style.backgroundImage = "url('assets/images/back1.jpg')";
  document.getElementById("bottom").style.backgroundColor = "rgba(124,197,227,0.8)";
  document.getElementById("bottom").style.backgroundColor = "rgba(0,0,0,0.8)";
  document.getElementById("bottom").style.borderColor = "#ccebff";
  document.getElementById("bottom").style.borderStyle = "double";
  document.getElementById("bottom").style.borderWidth = "10px 10px";

  //create a refresh button, for user resubmitted the form
  const refresh = document.createElement("button");
  refresh.id = "refresh";
  refresh.type = "button";
  document.getElementById("divbutton").appendChild(refresh);
  var refreshText = document.createTextNode("refresh");
  refresh.append(refreshText);

  //add eventlistener for the refresh
  refresh.addEventListener('click', refreshPage)
}

//function that reload the website
function refreshPage() {
  window.location.reload();
}


//function that adding the image and the video
function addImage() {
  var video;
  var source;
  video = document.createElement("video");
  video.setAttribute("controls", "controls")

  if (text == "The Longest Day") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/The Longest Day.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/The Longest Day.mp4")
    bottom.appendChild(image);



  }
  else if (text == "American Sniper") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/American Sniper.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));
    video.setAttribute("src", "assets/videos/American Sniper.mp4")
    bottom.appendChild(image);
  }

  else if (text == "You Only Live Twice") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/You Only Live Twice.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/You Only Live Twice.mp4")
    bottom.appendChild(image);
  }

  else if (text == "Tenet") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Tenet.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Tenet.mp4")

    bottom.appendChild(image);
  }

  else if (text == "Police Story") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Police Story.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Police Story.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Ip Man") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Ip Man.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Ip Man.mp4")
    bottom.appendChild(image);
  }

  else if (text == "The Kid") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/The Kid.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/The Kid.mp4")
    bottom.appendChild(image);
  }

  else if (text == "The Three Stooges") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/The Three Stooges.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/The Three Stooges.mp4")

    bottom.appendChild(image);
  }

  else if (text == "Who Framed Roger Rabbit") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Who Framed Roger Rabbit.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Who Framed Roger Rabbit.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Ralph Breaks the Internet") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Ralph Breaks the Internet.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Ralph Breaks the Internet.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Dr.Strangelove") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Dr.Strangelove.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Dr.Strangelove.mp4")
    bottom.appendChild(image);
  }

  else if (text == "Parasite") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Parasite.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Parasite.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Ghost") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Ghost.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Ghost.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Strange But True") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Strange But True.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Strange But True.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Titanic") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Titanic.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Titanic.mp4")
    bottom.appendChild(image);
  }


  else if (text == "Secret") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Secret.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Secret.mp4")
    bottom.appendChild(image);
  }
  else if (text == "Casablanca") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Casablanca.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Casablanca.mp4")
    bottom.appendChild(image);
  }


  else if (text == "Cold War") {
    var image = document.createElement("img");
    image.setAttribute("src", "assets/images/Cold War.jpg")
    bottom.appendChild(video);
    bottom.appendChild(document.createElement('hr'));

    video.setAttribute("src", "assets/videos/Cold War.mp4")
    bottom.appendChild(image);
  }
  else {
    document.getElementById("imageResult").innerHTML = "no image";
  }
}



