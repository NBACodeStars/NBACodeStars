import { createCloseIcon, createBtn } from "./utils.js";

// Function that displays the teams card
export const displayTeamCard = (team, cardsContainerEl) => {
  const { City, Name, WikipediaLogoUrl, TeamID } = team;
  const teamName = `${City} ${Name}`;

  // Team name
  const teamNameEl = document.createElement("h3");
  teamNameEl.innerText = teamName;
  teamNameEl.classList.add("cardTeamName");

  // Team image
  const teamImgEl = document.createElement("img");
  teamImgEl.src = WikipediaLogoUrl;
  teamImgEl.alt = `${teamName} logo`;
  teamImgEl.classList.add("cardImg");

  // Team image container
  const cardInnerEl = document.createElement("div");
  cardInnerEl.classList.add("cardInnerContainer");
  cardInnerEl.append(teamImgEl);

  // Team card
  const cardEl = document.createElement("li");

  // Team details button
  const teamBtnEl = createTeamDetailsBtn(team, cardInnerEl, cardEl);

  // Append elements to the card
  cardEl.classList.add("card");
  cardEl.setAttribute("data-card-id", TeamID);
  cardEl.append(cardInnerEl);
  cardEl.append(teamBtnEl);
  cardEl.append(teamNameEl);

  // Append to container
  cardsContainerEl.append(cardEl);
};

// Function to create a button that shows team details card
const createTeamDetailsBtn = (team, cardInnerEl, cardEl) => {
  const teamBtnEl = createBtn();
  teamBtnEl.innerHTML = "Team details";
  teamBtnEl.classList.add("btnTeamDetails");
  teamBtnEl.addEventListener("click", () => {
    displayTeamDetails(team, cardInnerEl, cardEl);
  });

  return teamBtnEl;
};

const displayTeamDetails = (team, cardInnerEl, cardEl) => {
  const { TeamID, City, Conference, Division } = team;

  // Team details container
  const teamDetailsContainer = document.createElement("div");
  teamDetailsContainer.classList.add("teamDetailsContainer");

  // Team details container
  teamDetailsContainer.innerHTML += `
    <p class="teamDetailsLabel">City</p>
    <p class="city">${City}</p>
    
    <p class="teamDetailsLabel">Conference</p>
    <p class="city">${Conference}</p>
    
    <p class="teamDetailsLabel">Division</p>
    <p class="city">${Division}</p>
  `;

  // Create close icon that shows team details button again and closes team details container
  const closeIconEl = createCloseIcon(teamDetailsContainer);
  closeIconEl.addEventListener("click", () => {
    const playerBtn = cardEl.getElementsByClassName("btnPlayerDetails")[0];
    playerBtn.remove();

    const teamBtnEl = createTeamDetailsBtn(team, cardInnerEl, cardEl);
    cardEl.append(teamBtnEl);
    cardInnerEl.parentNode.insertBefore(teamBtnEl, cardInnerEl.nextSibling);
  });

  closeIconEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const playerBtn = cardEl.getElementsByClassName("btnPlayerDetails")[0];
      playerBtn.remove();

      const teamBtnEl = createTeamDetailsBtn(team, cardInnerEl, cardEl);
      cardInnerEl.parentNode.insertBefore(teamBtnEl, cardInnerEl.nextSibling);
    }
  });

  teamDetailsContainer.append(closeIconEl);

  // Display the card to the user
  cardInnerEl.append(teamDetailsContainer);

  // Change team details to player details button
  const teamBtn = cardEl.getElementsByClassName("btnTeamDetails")[0];
  teamBtn.remove();

  // Player details button
  const playerBtnEl = createBtn();
  playerBtnEl.innerHTML = "Player details";
  playerBtnEl.classList.add("btnPlayerDetails");

  // playerBtnEl.addEventListener("click", () => {
  //   displayTeamDetails(team, cardInnerEl);
  // });

  // const aElem = document.createElement("a");
  // aElem.innerHTML = "Team details";
  // aElem.classList.add("btn");
  // aElem.classList.add("btnTeamDetails");
  // aElem.ariaRole = "button";
  // aElem.tabIndex = "0";

  // Show the button between the inner container and team name
  cardInnerEl.parentNode.insertBefore(playerBtnEl, cardInnerEl.nextSibling);

  // Event listener to close the team details card when close icon is clicked
  // ASK: Does .remove() get rid of the event listener on the close icon as well?
  // closeIconElem.addEventListener("click", (e) => {
  //   const teamDetailsCard = e.target.closest(".teamDetailsCard");

  //   // Refactor to create a general fadeout animation
  //   teamDetailsCard.classList.add("fadeOut");
  //   setTimeout(function () {
  //     teamDetailsCard.remove();
  //   }, 500);

  //   // Remove the team details button and add the player details button
  //   // Refactor with team details button being removed and player details being added
  //   const playerDetailsBtn =
  //     cardElem.getElementsByClassName("btnPlayerDetails")[0];
  //   playerDetailsBtn.remove();

  //   const aElem = document.createElement("a");
  //   aElem.innerHTML = "Team details";
  //   aElem.classList.add("btn");
  //   aElem.classList.add("btnTeamDetails");
  //   aElem.ariaRole = "button";
  //   aElem.tabIndex = "0";

  //   cardInnerContainer.parentNode.insertBefore(
  //     aElem,
  //     cardInnerContainer.nextSibling
  //   );

  //   // Add event listener to the team details button
  //   nbaCodeStars.teamDetailsListener(aElem);
  // });

  // Remove the team details button and add the player details button
  // Refactor this code with the player details event listener code
  // const teamDetailsBtn = cardElem.getElementsByClassName("btnTeamDetails")[0];
  // teamDetailsBtn.remove();

  // const aElem = document.createElement("a");
  // aElem.innerHTML = "Roster";
  // aElem.classList.add("btn");
  // aElem.classList.add("btnPlayerDetails");
  // aElem.ariaRole = "button";
  // aElem.tabIndex = "0";

  // aElem.addEventListener("click", (e) => {
  //   const cardId = e.target.closest(".card").id;
  //   const teamId = cardId.split("-")[1];

  //   nbaCodeStars.displayPlayerDetails(teamId);
  // });
  // aElem.addEventListener("keyup", (e) => {
  //   if (e.code === "Enter") {
  //     const cardId = e.target.closest(".card").id;
  //     const teamId = cardId.split("-")[1];
  //     nbaCodeStars.displayPlayerDetails(teamId);
  //   }
  // });

  // cardInnerContainer.parentNode.insertBefore(
  //   aElem,
  //   cardInnerContainer.nextSibling
  // );
  // });
};
