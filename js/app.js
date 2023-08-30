'use strict';

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
let chart = document.getElementById('chart');

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


let imgHolder = [];
function renderImgs() {

  while(imgHolder.length < 6) {
    let num = numGenerator();
    if (!imgHolder.includes(num)){
      imgHolder.push(num);
    }
  }

  let img1Index = imgHolder.pop();
  let img2Index = imgHolder.pop();
  let img3Index = imgHolder.pop();


  for(let i = -1; i <= imgHolder.length; i++) {
    imgHolder.pop();
  }



  imgHolder.unshift(img1Index);
  imgHolder.unshift(img2Index);
  imgHolder.unshift(img3Index);


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




    // * Local Data Storage

    /**
     * DONE Store `imagarray` into local storage as a formatted JSON string.
     * DONE Track Total Votes & Total Views (use objects within array)
     * DONE Display both within the Chart and Results table
     * DONE Make sure the data persists across both browser refreshes and resets
     * DONE Retrieve the products array from local storage use JSON.Parse()
     * TODO BONUS - Send each item in the array back through the constructor function.
    */

    let stringImg = JSON.stringify(imgarray);
    localStorage.setItem('totals', stringImg);


  }
}







function showResults() {

  console.log('after: ', imgarray);
  if (votingRounds === 0){
    for (let i =0; i < imgarray.length; i++) {
      let results = document.createElement('li');
      results.textContent = `${imgarray[i].name} had ${imgarray[i].votes} votes and was seen ${imgarray[i].displayCount} times.`;
      resultList.appendChild(results);
    }
    resultBtn.removeEventListener('click', showResults);
  }

  let labelArray = [];
  let viewsArray = [];
  let votesArray = [];

  for (let i = 0; i < imgarray.length; i++){
    labelArray.push(imgarray[i].name);
    viewsArray.push(imgarray[i].displayCount);
    votesArray.push(imgarray[i].votes);
    
    
    
    
  }




  new Chart(chart, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        borderWidth: 1,
        backgroundColor: 'red'
      },
      {
        label: 'Views',
        data: viewsArray,
        borderWidth: 1,
        backgroundColor: 'blue'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



// * EXECUTABLE CODE
let retrieveImg = localStorage.getItem('totals');
let parsedImg = JSON.parse(retrieveImg);

if(retrieveImg) {
  imgarray = parsedImg;
} else {

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
}
  
  renderImgs();
  lineUp.addEventListener('click', imgClick);
resultBtn.addEventListener('click', showResults);
