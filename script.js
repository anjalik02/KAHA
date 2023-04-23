chrome.runtime.sendMessage({name: "fetchWords"}, (response) =>{
  console.log(response);

  //Updating the Word with 
  document.querySelector('body').innerHTML = response.items[0].snippet.title;

});

