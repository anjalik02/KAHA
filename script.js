document.addEventListener('DOMContentLoaded', function () {

    // Get the currently playing song from the Spotify API
    function getCurrentlyPlayingSong(accessToken) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/me/player/currently-playing');
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        xhr.onload = () => {
          if (xhr.status === 200) {
            const song = JSON.parse(xhr.responseText);
            resolve(song);
          } else {
            reject(new Error('Failed to fetch currently playing song'));
          }
        };
        xhr.send();
      });
    }
  
    // Convert the song to Braille sheet music
    async function convertToBrailleSheetMusic(song) {
      // Use a music notation API to convert the song to sheet music
      // Then, use a Braille notation library to convert the sheet music to Braille notation
      // Finally, display the Braille sheet music in the extension
      const brailleSheetMusicDiv = document.getElementById('brailleSheetMusic');
      brailleSheetMusicDiv.textContent = 'Braille sheet music for the song would be displayed here';
    }
  
    // Get the auth token
    function getAuthToken() {
      return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, token => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(token);
          }
        });
      });
    }
  
    // Authenticate and fetch the song from Spotify
    async function authenticateAndGetSong() {
      try {
        const token = await getAuthToken();
        const song = await getCurrentlyPlayingSong(token);
        await convertToBrailleSheetMusic(song);
      } catch (error) {
        console.error(error);
      }
    }
  
    // Call the function on popup load
    authenticateAndGetSong();
  });
  