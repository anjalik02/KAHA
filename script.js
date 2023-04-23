// Throws an error on pages that are not Genius Lyrics
if (window.location.hostname !== "genius.com") {
  const lyricsContainer = document.getElementById("lyrics-container");
  lyricsContainer.innerText = "Open lyrics on genius.com";
}

// Holds the English to Braille Dictionary
const braille_alpha = {
    "0": "⠚",
    "1": "⠁",
    "2": "⠃",
    "3": "⠉",
    "4": "⠙",
    "5": "⠑",
    "6": "⠋",
    "7": "⠛",
    "8": "⠓",
    "9": "⠊",
    "a": "⠁",
    "b": "⠃",
    "c": "⠉",
    "d": "⠙",
    "e": "⠑",
    "f": "⠋",
    "g": "⠛",
    "h": "⠓",
    "i": "⠊",
    "j": "⠚",
    "k": "⠅",
    "l": "⠇",
    "m": "⠍",
    "n": "⠝",
    "o": "⠕",
    "p": "⠏",
    "q": "⠟",
    "r": "⠗",
    "s": "⠎",
    "t": "⠞",
    "u": "⠥",
    "v": "⠧",
    "w": "⠺",
    "x": "⠭",
    "y": "⠽",
    "z": "⠵",
    " ": " "
  };
  
function brailleConvert(text) {
    let brailleText = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        const brailleChar = braille_alpha[char] || char;
        brailleText += brailleChar;
    }
    return brailleText;
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var currentUrl = tabs[0].url;
  const lyricsClass = "Lyrics__Container-sc-1ynbvzw-5";

fetch(currentUrl)
  .then(response => response.text())
  .then(html => {
    // Paste song lyrics
    const doc = new DOMParser().parseFromString(html, "text/html");
    const lyricsElem = doc.querySelector(`div.${lyricsClass}`);
    const lyricsLinks = lyricsElem.querySelectorAll('a');
    lyricsLinks.forEach(link => link.parentNode.removeChild(link));
    const lyricsText = lyricsElem.innerHTML.trim();
    const lyricsLines = lyricsText.split('<br>');
    const lyricsWithDivs = lyricsLines.map(line => `<div>${line}</div>`).join('');
    const lyricsContainer = document.getElementById("lyrics-container");
    lyricsContainer.innerHTML = lyricsWithDivs;

    // Paste lyrics in braille
    const braille_conversion = brailleConvert(lyricsText);
    console.log(braille_conversion);
    const brailleContainer = document.getElementById("braille-container");
    brailleContainer.innerHTML = braille_conversion;
  })
  .catch(error => console.error(error));
});
