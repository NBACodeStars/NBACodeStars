// Function to create an icon that closes elements
export const createCloseIcon = (closingEl) => {
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
  console.log(closingEl);
  closingEl.classList.add("fadeOut");
  setTimeout(function () {
    closingEl.remove();
  }, 500);
};

export const getTeamById = (teamData, teamId) => {
  return teamData.find((team) => team.TeamID === parseInt(teamId));
};
