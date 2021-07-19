// Function to create an icon that comes with event listener to close elements
export const createCloseIcon = (closingEl) => {
  // Create the icon element
  const iconEl = document.createElement("i");
  iconEl.classList.add("fas", "fa-times", "closeIcon");
  iconEl.tabIndex = "0";

  // Add event listener to close and remove modal on click
  iconEl.addEventListener("click", () => {
    removeElement(closingEl);
  });

  // Add event listener to close and remove modal on pressing enter key
  iconEl.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      removeElement(closingEl);
    }
  });

  return iconEl;
};

// Function that adds a fadeout animation when removing elements from the page
const removeElement = (closingEl) => {
  closingEl.classList.add("fadeOut");
  setTimeout(function () {
    closingEl.remove();
  }, 500);
};

export const getTeamByTeamId = (teamData, teamId) => {
  return teamData.find((team) => team.TeamID === parseInt(teamId));
};

export const getPlayerByPlayerId = (teamData, playerId) => {
  return teamData.find((team) => team.PlayerID === parseInt(playerId));
};

export const createBtn = () => {
  const btn = document.createElement("a");
  btn.innerHTML = "Button";
  btn.classList.add("btn");
  btn.ariaRole = "button";
  btn.tabIndex = "0";

  return btn;
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
