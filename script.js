chrome.runtime.sendMessage({name: "fetchWords"}, (response) =>{
  console.log(response);

  //Updating the Word with the name of the song
  document.querySelector('#songName').innerHTML = response.items[0].snippet.title;

});

