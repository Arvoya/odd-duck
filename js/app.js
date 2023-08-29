'use strict';

/**
 * DONE Create Constructor function
 * DONE Constructor properties: Name, File path, Time image has been shown
 * DONE User should be presented with 25 rounds of voting
 * DONE Create helper function that generates 3 unique product images from img directory
 * DONE Add a button with the text view results
 * DONE Keep track of number of times a product has been clicked 
 * DONE Attach Event listener to the section of the HTML page where the images are going to be displayed
 * DONE Once user clicks a product, generate three new products
 * DONE Create a property attached to the constructor function to track which products have been clicked.
 * DONE Every time it has been shown count it
 * TODO Update the count on the results section in HTML
 * TODO keep the rounds in a variable to allow the number to easily changed
 * TODO button when clicked list of all the products followed by the votes received, and the number of times seen for each. example "banana had 3 votes, and was seen 5 times."
*/

// *GLOBALS
let imgarray = [];
let votingRounds = 25;


// * DOM WINDOWS
let lineUp = document.getElementById('lineUp');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let resultBtn = document.getElementById('resultBtn');
let resultList = document.getElementById('ResultsList');

// * CONSTRUCTOR FUNCTIONS

function Img(name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.displayCount = 0;
}


// * HELPER FUNCTIONS
function numGenerator() {
  return Math.floor(Math.random() * imgarray.length);
}


function renderImgs() {
  let img1Index = numGenerator();
  let img2Index = numGenerator();
  let img3Index = numGenerator();
  while(img1Index === img2Index) {
    img2Index = numGenerator();
  }
  while(img1Index === img3Index) {
    img3Index = numGenerator();
  }
  while(img2Index === img3Index) {
    img2Index = numGenerator();
  }

  img1.src = imgarray[img1Index].image;
  img1.title = imgarray[img1Index].name;
  img2.src = imgarray[img2Index].image;
  img2.title = imgarray[img2Index].name;
  img3.src = imgarray[img3Index].image;
  img3.title = imgarray[img3Index].name;

  imgarray[img1Index].displayCount++;
  imgarray[img2Index].displayCount++;
  imgarray[img3Index].displayCount++;

}

// * EVENT HANDLERS
function imgClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < imgarray.length; i++){
    if (imgClicked === imgarray[i].name) {
      imgarray[i].votes++;
      // console.log(`${imgarray[i].name} has ${imgarray[i].votes} votes`);
      votingRounds--;
      renderImgs();
    }
  }
  if (votingRounds === 0) {
    lineUp.removeEventListener('click', imgClick);
  }
}

function showResults() {
  if (votingRounds === 0){
    for (let i =0; i < imgarray.length; i++) {
      let results = document.createElement('li');
      results.textContent = `${imgarray[i].name} had ${imgarray[i].votes} votes and was seen ${imgarray[i].displayCount} times.`;
      resultList.appendChild(results);
    }
    resultBtn.removeEventListener('click', showResults);
  }
}


// * EXECUTABLE CODE
let bag = new Img ('bag');
let banana = new Img('banana');
let bathroom = new Img('bathroom');
let boots = new Img('boots');
let breakfast = new Img('breakfast');
let bubblegum = new Img('bubblegum');
let chair = new Img('chair');
let cthulhu = new Img('cthulhu');
let dogduck = new Img('dog-duck');
let dragon = new Img('dragon');
let pen = new Img('pen');
let petsweep = new Img('pet-sweep');
let scissors = new Img('scissors');
let shark = new Img('shark');
let sweep = new Img('sweep', 'png');
let tauntaun = new Img('tauntaun');
let unicorn = new Img('unicorn');
let watercan = new Img('water-can');
let wineglass = new Img('wine-glass');

imgarray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);

renderImgs();
lineUp.addEventListener('click', imgClick);
resultBtn.addEventListener('click', showResults);
