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
    " ": " ",
    "0": "⠚",
    "1": "⠁",
    "2": "⠃",
    "3": "⠉",
    "4": "⠙",
    "5": "⠑",
    "6": "⠋",
    "7": "⠛",
    "8": "⠓",
    "9": "⠊"
  };
  
function brailleConvert(text) {
    let brailleText = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (char === "<" && text.slice(i, i + 4) === "<br>") {
            brailleText += "<br>";
            i += 3;
        }
        else {
            const brailleChar = braille_alpha[char] || char;
            brailleText += brailleChar;
        }
    }
    return brailleText;
}

function generatePdf() {
  const lyricsText = document.getElementById("lyrics-container").innerText;
  const brailleText = document.getElementById("braille-container").innerText;
  
  // Define the document size and margins
  const doc = new jsPDF("p", "pt", "letter");
  const margin = 40;
  const title = "Lyrics to Braille Conversion";
  
  // Add title to the document
  doc.setFontSize(20);
  doc.text(title, margin, margin);
  
  // Add lyrics and braille text to the document
  doc.setFontSize(12);
  doc.text("Original Lyrics:", margin, margin + 40);
  doc.text(lyricsText, margin, margin + 60);
  
  doc.text("Braille Conversion:", margin, margin + 200);
  doc.text(brailleText, margin, margin + 220);
  
  return doc;
  }

  function downloadPdf() {
      const doc = generatePdf();
      const pdfUrl = doc.output('datauristring');
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', pdfUrl);
      downloadLink.setAttribute('download', 'conversion.pdf');
      downloadLink.click();
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


    // Add a download button to the page
    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download PDF";
    downloadButton.addEventListener("click", downloadPdf);
    document.body.appendChild(downloadButton);
  })
  .catch(error => console.error(error));
});


// Throws an error on pages that are not Genius Lyrics
if (window.location.hostname !== "genius.com") {
    const lyricsContainer = document.getElementById("lyrics-container");
    lyricsContainer.innerText = "Open lyrics on genius.com";
  
    const braille_conversion = brailleConvert(lyricsContainer.innerText);
    const brailleContainer = document.getElementById("braille-container");
    brailleContainer.innerHTML = brailleConvert(braille_conversion);
  }