chrome.runtime.sendMessage({name: "fetchWords"}, (response) =>{
  console.log(response);

  //Updating the Word with 
  document.querySelector('#brailleSheetMusic').innerHTML = response.items[0].snippet.title;

});

