const info = document.getElementById("info");
let windowWidth = window.innerWidth;

// Check window width
if (windowWidth <= 1000) {
  const swipeMessage = document.createElement("p");
  swipeMessage.innerHTML = '<i class="far fa-hand-pointer"></i> Swipe table horizontally for more data';
  swipeMessage.className = "swipe-message";
  info.append(swipeMessage);
}