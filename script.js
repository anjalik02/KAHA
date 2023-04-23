// const url = window.location.href;
// if (window.location.hostname !== "genius.com") {
//   const lyricsContainer = document.getElementById("lyrics-container");
//     lyricsContainer.innerText = "";
// }

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var currentUrl = tabs[0].url;
  console.log("Current URL: " + currentUrl);
const lyricsClass = "Lyrics__Container-sc-1ynbvzw-5";

fetch(currentUrl)
  .then(response => response.text())
  .then(html => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const lyricsElem = doc.querySelector(`div.${lyricsClass}`);
    const lyricsText = lyricsElem.innerText.trim();
    const lyricsContainer = document.getElementById("lyrics-container");
    lyricsContainer.innerText = lyricsText;
  })
  .catch(error => console.error(error));
});
