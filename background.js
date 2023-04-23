var url = "https://www.youtube.com/watch?v=anqxTwGE_nQ";  //default
var videoID = "anqxTwGE_nQ";

//returns the name of the current youtube video playing
chrome.runtime.onMessage.addListener((msg,sender,response) =>{

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    url = tabs[0].url;
  });
  
  videoID = url.split("v=")[1];
 
  if (msg.name == "fetchWords"){
    const key = 'AIzaSyAq0WQIbJmC3jelYQnIb4_SJ8to-5fY6UY';  //youtube data v3 api key
   
    
    const apiCall = "https://www.googleapis.com/youtube/v3/videos?id="+videoID+"&key="+key+"&part=snippet,contentDetails,statistics,status";
    fetch(apiCall).then(function(res){
      //wait for response
      if (res.status !== 200){
        console.log("error");
      }
      res.json().then(function(data){
        //send the response
        response(data);

      });
    }).catch(function(err){
      response("error");
    });
  }
  
  return true;

});

////// NEW STUFF BELOW

// returns the sheet music of the current song playing
chrome.runtime.onMessage.addEventListener("DOMContentLoaded", function() {
  var searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function() {
    var songName = document.getElementById("song-name").value;
    var apiUrl = "https://api.musescore.com/services/rest/score.json?q=" + encodeURIComponent(songName);
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        var resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";
        
        if (data.resultCount == 0) {
          resultsContainer.innerHTML = "No results found.";
        } else {
          data.results.forEach(function(result) {
            var resultElement = document.createElement("div");
            resultElement.innerHTML = "<a href='" + result.url + "'>" + result.title + "</a>";
            resultsContainer.appendChild(resultElement);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
});
