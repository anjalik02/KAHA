chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setPopup({ popup: 'index.html' });
  });
  
  // Get the currently playing song from the Spotify API
  async function getCurrentlyPlayingSong(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    if (response.ok) {
      const song = await response.json();
      return song;
    } else {
      throw new Error('Failed to fetch currently playing song');
    }
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
  
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'authenticateAndGetSong') {
      try {
        const token = await getAuthToken();
        const song = await getCurrentlyPlayingSong(token);
        sendResponse({ success: true, song: song });
      } catch (error) {
        console.error(error);
        sendResponse({ success: false, error: error.message });
      }
    }
    return true;
  });
  