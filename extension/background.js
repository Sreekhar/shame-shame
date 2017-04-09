// this is the background code...

// listen for our browerAction to be clicked
chrome.tabs.query({active: true}, function(tabs) {
	var tab = tabs[0];
	console.log(tab);
	chrome.tabs.executeScript(tab.id, {
    code: 'document.querySelector("#comment-simplebox .comment-simplebox-text").textContent'
  }, display_h1);
});
