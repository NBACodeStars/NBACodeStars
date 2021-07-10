// PULLING DATA
// 1. Create namespace
// 2. Create Init function
//     1. Create function called displayTeamImages() (Loop through the teams array, make API Call to fetch team logos)
// 3. displayTeamImages()
//         1. Loop through the teams array
//         2. Make API Call for each team.
//             1.  https://gist.github.com/jerhinesmith/258eab7a892c87769115
//         3. Create HTML elements
//         4. Display images to page.
//         5. http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/#{abbreviation}.png
//  4. Create a pull to get team details and player details
// 	TEAM details - https://www.balldontlie.io/api/v1/teams
// 	PLAYER details - https://www.balldontlie.io/api/v1/players
// 	Store these in arrays, objects or variables
// 	ALTERNATIVE - Make the api calls for each team or player as they are clicked.
//   5. Hover Effect Step (Team Details)
//     1. Create hover effect event listener attached to every team image
//     2. When event is triggered we loop through the team details variable and extract the selected teams details to save in a variable.
//     3. Create the html element for each piece of info on the team
//     4. Append on insert the info into appropriate html element. City, conference, division and the full name of the team.
//         1. Create ID for each team which is equal to the ID from the team details variable (from the API Call above)
//         2. Create a link element inside the overlay which a user can click to display players on the team.
//     5. Append that html as an overlay over the team image

// create a namespace app
// Make an api call to upsplash
// Construct new url to add to search params
// Display photos we get from unsplash api

// Todo: Check if caps is good with mentors
const NBACodeStars = {};

// 1. init method that kicks everything off
NBACodeStars.init = () => {
  NBACodeStars.getTeams();
  NBACodeStars.getSelection();
};

NBACodeStars.teamDropdownElem =
  document.getElementsByClassName("teamDropdown")[0];
NBACodeStars.cardsContainerElem =
  document.getElementsByClassName("teamCards")[0];

// Team details API
NBACodeStars.apiUrl = "https://www.balldontlie.io";
NBACodeStars.apiEndpoint = `${NBACodeStars.apiUrl}/api/v1/teams/`;

// 2. Function that makes the API call
NBACodeStars.getTeams = () => {
  const url = new URL(NBACodeStars.apiEndpoint);

  fetch(url)
    .then((res) => res.json())
    .then((response) => {
      NBACodeStars.teamsData = response.data;
      NBACodeStars.displayTeamsDropdown(NBACodeStars.teamsData);
    })
    .catch(() => {
      // TODO: Error handling
    });
};

// 3. Function that displays the teams in the dropdown
NBACodeStars.displayTeamsDropdown = (teams) => {
  // Clear container
  NBACodeStars.cardsContainerElem.innerHTML = "";

  teams.forEach((team) => {
    const teamName = team.full_name;

    const optionElem = document.createElement("option");
    optionElem.innerText = teamName;
    optionElem.value = teamName;
    optionElem.id = team.id;

    NBACodeStars.teamDropdownElem.append(optionElem);

    NBACodeStars.displayTeamCard(team);
  });
};

// 4. Function that displays the teams card
NBACodeStars.displayTeamCard = (team) => {
  const h2Elem = document.createElement("h2");
  h2Elem.innerText = team.full_name;
  h2Elem.classList.add("cardTeamName");

  const shortName = team.abbreviation.toLowerCase();
  const imageURL = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${shortName}.png`;
  const imgElem = document.createElement("img");
  imgElem.src = imageURL;
  imgElem.alt = team.full_name; // CHANGED
  imgElem.classList.add("cardImg");

  const liElem = document.createElement("li");
  liElem.classList.add("card");
  liElem.append(imgElem);
  liElem.append(h2Elem);

  NBACodeStars.cardsContainerElem.append(liElem);
};

// 5. Function to set up event listener on the select dropdown

// CHANGED
NBACodeStars.getSelection = () => {
  NBACodeStars.teamDropdownElem.addEventListener("change", () => {
    const options = document.querySelectorAll("option");
    let noSelection = true;

    NBACodeStars.cardsContainerElem.innerHTML = "";

    // Display all the team cards selected
    for (const option in options) {
      // Only show the card if there is an actual team selected
      if (options[option].selected && options[option].id !== "all") {
        const id = parseInt(options[option].id);

        noSelection = false;

        const teamData = NBACodeStars.teamsData.find((team) => {
          return team.id === id && team;
        });
        NBACodeStars.displayTeamCard(teamData);
      }
    }

    // Display all team cards if no specific team is selected
    if (noSelection) {
      NBACodeStars.teamsData.forEach((team) => {
        NBACodeStars.displayTeamCard(team);
      });
    }
  });
};

// 0. Calling the init to hit it off
NBACodeStars.init();

// STRETCH GOALS
//      1. Show players to the user after they have clicked the show player button.
// 	2. Create event listener to listen for the click on the specific team. Use the event variable to extract the ID of the element that the user clicked.
// 	     a. Filter the player details variable to extract all the players that have the same team ID as what we extracted.
// 	      b. Save the player names in  a separate variable
// 	3. Create html elements to store players first name, last name and position.
// 	4. Display on screen over the team image container. Create link for each player to show their stats.
// 	5. Make API Call to retrieve player headshot and create an html element that displays with player name on the screen.
// FINAL STRETCH GOALS 2 MORE STRETCHY
// 	1. Display player stats
// 		2. Populate the link on each player so their individual stats are shown: points, rebounds, assists, blocks, steals, field goal percentage, turnover.
// FUN STRETCH GOAL
// 	1. Cage Finder!
// 	2. A button in the top right hand corner of the screen with Nicholas Cages face that says CAGE FINDER
// 	3. It throws up 10 movie posters of Nicholas Cage with titles
// 	4. There is a button that says back to basketball which takes us back to the original site.

// ***************************************************
// OLD CODEEEE
// ***************************************************

// const NBACodeStars = {};

// NBACodeStars.init = () => {};

// API CALL

// fetch("https://www.septastats.com/api/current/system/latest")
//   .then(function (responseObj) {
//     console.log("It worked!");
//     return responseObj.json();
//   })
//   .then(function (theRealData) {
//     console.log("another promise resolved", theRealData);
//   });

//  Shorter way

// fetch("")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

//      Construct new URL params

// const url = new URL("https://api.datamuse.com/words");
// url.search = new URLSearchParams({
//   ml: "computer",
// });
// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// const selectEl = document.querySelector("select");
// const button = document.querySelector("button");

// button.addEventListener("click", getUserSelection);

// let selectionArray = [];

// const getUserSelection = () => {
//   // Write a function that pushes each team selected from form into an array
// };

// CREATING HTML

// NBACodeStars.selectionArray.forEach((item) => {
//   // create the new element
//   const newListItem = document.createElement("li");

//   newListItem.innerHTML = `
//       <h2>${item.title}</h2>
//       <img src=${item.url} alt="The basketball team ${item.title}">
//     `;
//   // City, conference, division and the full name of the team.

//   // appending the new content to the screen
//   displayUl.appendChild(newListItem);
// });
