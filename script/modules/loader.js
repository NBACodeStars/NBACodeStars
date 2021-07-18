// Show loading spinner
export const showLoader = () => {
  const mainEl = document.querySelector("main");
  mainEl.setAttribute("aria-busy", false);

  const loaderEl = document.getElementById("loader");
  loaderEl.classList.remove("hide");
};

// Hide loading spinner
export const hideLoader = () => {
  const mainEl = document.querySelector("main");
  mainEl.setAttribute("aria-busy", true);

  const loaderEl = document.getElementById("loader");
  loaderEl.classList.add("hide");
};
