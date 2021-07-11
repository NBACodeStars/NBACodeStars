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

NBACodeStars.teamSelectDropdown =
  document.getElementsByClassName("teamSelectDropdown")[0];
NBACodeStars.cardsContainerElem =
  document.getElementsByClassName("teamCards")[0];

// Team details API
NBACodeStars.apiUrl = "https://www.balldontlie.io";
NBACodeStars.apiTeamsEndpoint = `${NBACodeStars.apiUrl}/api/v1/teams/`;
NBACodeStars.apiTeamDetailsEndpoint = `${NBACodeStars.apiUrl}/api/v1/players/`;

// 2. Function that makes the API call
NBACodeStars.getTeams = () => {
  const url = new URL(NBACodeStars.apiTeamsEndpoint);

  fetch(url)
    .then((res) => res.json())
    .then((response) => {
      NBACodeStars.teamsData = response.data;
      NBACodeStars.displayOptions(NBACodeStars.teamsData);
      NBACodeStars.highLightOption()
    })
    .catch(() => {
      // TODO: Error handling
    });
};

// 3. Function that displays the teams in the dropdown
NBACodeStars.displayOptions = (teams) => {

  teams.forEach(team)
  console.log(team)
    const teamName = team.full_name;

    const optionLi = document.createElement("li");
    // This could be any header element or a button
    optionUl.innerText = teamName;
    // Do we still need a value here if they are not option elements
    optionLi.value = teamName;
    optionLi.id = team.id;
    optionLi.tabIndex = "0";
    optionLi.role = "option";
    // This will be the css class background color toggled on or off
    

    NBACodeStars.teamSelectDropdown.append(optionLi);

    NBACodeStars.displayTeamCard(team);
  };

  NBACodeStars.highLightOption = () => {
    NBACodeStars.teamDropdownElem.addEventListener("click", (event) => {
      console.log(event.target)
      let selectedChoice =  event.target 
      selectedChoice.toggle("highLight");
    });
  }

      // .highLight {
    //   backgroundColor: lightGrey;
    // }

 
// 4. Function that displays the teams card
NBACodeStars.displayTeamCard = (team) => {
  const h3Elem = document.createElement("h3");
  h3Elem.innerText = team.full_name;
  h3Elem.classList.add("cardTeamName");

  const shortName = team.abbreviation.toLowerCase();
  const imageURL = `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${shortName}.png`;
  const imgElem = document.createElement("img");
  imgElem.src = imageURL;
  imgElem.alt = team.full_name; // CHANGED
  imgElem.classList.add("cardImg");

  const cardInnerContainerElem = document.createElement("div");
  cardInnerContainerElem.classList.add("cardInnerContainer");
  cardInnerContainerElem.append(imgElem);

  // CHANGED
  const aElem = document.createElement("a");
  aElem.innerHTML = "Team details";
  aElem.classList.add("btn");
  aElem.classList.add("btnTeamDetails");
  aElem.ariaRole = "button";

  NBACodeStars.teamDetailsListener(aElem);

  const liElem = document.createElement("li");
  liElem.classList.add("card");
  liElem.id = `card-${team.id}`;
  liElem.append(cardInnerContainerElem);
  liElem.append(aElem);
  liElem.append(h3Elem);

  NBACodeStars.cardsContainerElem.append(liElem);
};

// 5. Function to set up event listener on the select dropdown

// CHANGED
NBACodeStars.getSelection = () => {
  NBACodeStars.teamSelectDropdown.addEventListener("change", function(){
    const options = document.querySelectorAll(".teamSelectDropdown li");
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

// Add event listener to the team details buttons populated
// Call the function when team details button has been created
NBACodeStars.teamDetailsListener = (btnElement) => {
  btnElement.addEventListener("click", (e) => {
    // Determine which team was selected based on the id of the card it is in
    const cardId = e.target.closest(".card").id;
    const teamId = cardId.split("-")[1];

    let teamDetailsObj = null;

    // Collect team details in a variable
    for (const key in NBACodeStars.teamsData) {
      if (parseInt(teamId) === parseInt(NBACodeStars.teamsData[key].id)) {
        teamDetailsObj = NBACodeStars.teamsData[key];
        break;
      }
    }

    // Create team details card

    // Create elements to hold team details
    const closeIconElem = document.createElement("i");
    closeIconElem.classList.add("fas", "fa-times", "closeIcon");

    const cityElem = document.createElement("p");
    cityElem.innerHTML = teamDetailsObj.city;
    cityElem.classList.add("city");

    const cityLabelElem = document.createElement("p");
    cityLabelElem.innerHTML = "City";
    cityLabelElem.classList.add("teamDetailsLabel");

    const conferenceElem = document.createElement("p");
    conferenceElem.innerHTML = teamDetailsObj.conference;
    conferenceElem.classList.add("conference");

    const conferenceLabelElem = document.createElement("p");
    conferenceLabelElem.innerHTML = "Conference";
    conferenceLabelElem.classList.add("teamDetailsLabel");

    const divisionElem = document.createElement("p");
    divisionElem.innerHTML = teamDetailsObj.division;
    divisionElem.classList.add("division");

    const divisionLabelElem = document.createElement("p");
    divisionLabelElem.innerHTML = "Division";
    divisionLabelElem.classList.add("teamDetailsLabel");

    // Create an overlay container to hold team details and append details into it
    const teamDetailsCardElem = document.createElement("div");
    teamDetailsCardElem.classList.add("teamDetailsCard");
    teamDetailsCardElem.append(closeIconElem);
    teamDetailsCardElem.append(cityLabelElem);
    teamDetailsCardElem.append(cityElem);

    teamDetailsCardElem.append(conferenceLabelElem);
    teamDetailsCardElem.append(conferenceElem);

    teamDetailsCardElem.append(divisionLabelElem);
    teamDetailsCardElem.append(divisionElem);

    // append overlay to card inner div for the card selected
    const cardElem = document.getElementById(cardId);
    const cardInnerContainer =
      cardElem.getElementsByClassName("cardInnerContainer")[0];

    cardInnerContainer.append(teamDetailsCardElem);

    // Event listener to close the team details card when close icon is clicked
    // ASK: Does .remove() get rid of the event listener on the close icon as well?
    closeIconElem.addEventListener("click", (e) => {
      const teamDetailsCard = e.target.closest(".teamDetailsCard");

      // Refactor to create a general fadeout animation
      teamDetailsCard.classList.add("fadeOut");
      setTimeout(function () {
        teamDetailsCard.remove();
      }, 500);

      // Remove the team details button and add the player details button
      // Refactor with team details button being removed and player details being added
      const playerDetailsBtn =
        cardElem.getElementsByClassName("btnPlayerDetails")[0];
      playerDetailsBtn.remove();

      const aElem = document.createElement("a");
      aElem.innerHTML = "Team details";
      aElem.classList.add("btn");
      aElem.classList.add("btnTeamDetails");
      aElem.ariaRole = "button";

      cardInnerContainer.parentNode.insertBefore(
        aElem,
        cardInnerContainer.nextSibling
      );

      // Add event listener to the team details button
      NBACodeStars.teamDetailsListener(aElem);
    });

    // Remove the team details button and add the player details button
    // Refactor this code with the player details event listener code
    const teamDetailsBtn = cardElem.getElementsByClassName("btnTeamDetails")[0];
    teamDetailsBtn.remove();

    const aElem = document.createElement("a");
    aElem.innerHTML = "Player details";
    aElem.classList.add("btn");
    aElem.classList.add("btnPlayerDetails");
    aElem.ariaRole = "button";

    aElem.addEventListener("click", NBACodeStars.displayPlayerDetails);

    cardInnerContainer.parentNode.insertBefore(
      aElem,
      cardInnerContainer.nextSibling
    );
  });
};

// Display player details on the screen
NBACodeStars.displayPlayerDetails = () => {
  // Create player details modal
  // Create close icon -> refactor code from above to manage close icon functionality
  const closeIconElem = document.createElement("i");
  closeIconElem.classList.add("fas", "fa-times", "closeIcon");

  const playerDetailsContainerElem = document.createElement("div");
  playerDetailsContainerElem.classList.add("playerDetailsContainer");
  playerDetailsContainerElem.innerHTML = "Hello";
  playerDetailsContainerElem.append(closeIconElem);

  const playerDetailsOuterElem = document.createElement("div");
  playerDetailsOuterElem.classList.add("playerDetailsOuterContainer");
  playerDetailsOuterElem.append(playerDetailsContainerElem);

  const bodyElem = document.querySelector("body");
  bodyElem.prepend(playerDetailsOuterElem);

  closeIconElem.addEventListener("click", (e) => {
    const playerDetailsOuterContainerElem = e.target.closest(
      ".playerDetailsOuterContainer"
    );

    // Refactor to create a general fadeout animation
    playerDetailsOuterContainerElem.classList.add("fadeOut");
    setTimeout(function () {
      playerDetailsOuterContainerElem.remove();
    }, 500);
  });

  // Make async api call to get player details on page load

  // Determine which team was selected
  // Filter down players on the selected team
  // Create li element and p elements for name, position, general stats
  // Append p elements to li then li to container and container to screen
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
