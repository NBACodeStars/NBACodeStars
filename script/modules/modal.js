import { createCloseIcon } from "./utils.js";

// Function to create a dynamic modal that is shown on the center of the page
export const createModal = (showCloseIcon = true) => {
  // Create inner modal with message
  const modalInner = document.createElement("div");
  modalInner.classList.add("modalInnerContainer");

  // Create outer modal container
  const modalEl = document.createElement("div");
  modalEl.classList.add("modalOuterContainer");

  // Create an icon if desired
  if (showCloseIcon) {
    const closeIconEl = createCloseIcon(modalEl);
    modalInner.append(closeIconEl);
  }

  // Append the elements to display it on the body to the user
  modalEl.append(modalInner);

  return modalEl;
};

// Function to display a fetch error modal to the user
export const displayErrorModal = (message, showCloseIcon = true) => {
  const messageEl = document.createElement("p");
  messageEl.classList.add("errorMessage");
  messageEl.textContent = message;

  const modalEl = createModal(showCloseIcon);
  const modalInner = modalEl.querySelector(".modalInnerContainer");
  modalInner.append(messageEl);

  const bodyElem = document.querySelector("body");
  bodyElem.prepend(modalEl);
};
