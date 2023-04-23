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