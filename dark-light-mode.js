let darkMode = localStorage.getItem('darkMode');
const darkModeToogle = document.querySelector(".dark-mode-toogle");

// check if dark mode is enabled or disabled
const enableDarkMode = () => {
  //add class darkmode to the body
  document.body.classList.add("darkmode")
  //update to lacal storage
  localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
  //add class darkmode to the body
  document.body.classList.remove("darkmode");
  //update to lacal storage
  localStorage.setItem("darkMode", null);
}
//check from local storage on page load
if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToogle.addEventListener("click", () => {
  // div.style.transform = "rotate(-7deg)";
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});