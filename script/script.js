
const NBACodeStars = {}

NBACodeStars.init = () => {

  }

// API CALL

 fetch('https://www.septastats.com/api/current/system/latest')
     .then(function(responseObj){
       console.log('It worked!');
       return responseObj.json();
     })
     .then(function(theRealData){
       console.log('another promise resolved',theRealData);
     })

//  Shorter way 

     fetch('')
     .then(res => res.json())
     .then (data => {
       console.log(data)
     })

//      Construct new URL params

    const url = new URL('https://api.datamuse.com/words');
    url.search = new URLSearchParams({
      ml:'computer'
    })
    fetch(url)
    .then(res => res.json())
    .then (data => {
      console.log(data)
    })



const selectEl = document.querySelector("select");
const button = document.querySelector("button")

button.addEventListener('click', getUserSelection) 

let selectionArray = []

const getUserSelection = () => {
    // Write a function that pushes each team selected from form into an array
    
}


  // CREATING HTML
  
  NBACodeStars.selectionArray.forEach((item) => {
    // create the new element
    const newListItem = document.createElement("li");

    newListItem.innerHTML = `
      <h2>${item.title}</h2> 
      <img src=${item.url} alt="The basketball team ${item.title}">
    `;
    // City, conference, division and the full name of the team.

    // appending the new content to the screen
    displayUl.appendChild(newListItem)
  });




