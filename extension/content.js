chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var regex_match = window.location.href.match(regex_to_keep);
    if (regex_match) {
      if( confirm("open the following urls?\n" + base_urls) && request.message === "clicked_browser_action" ) {
        base_urls.forEach( function(url) {
          chrome.runtime.sendMessage({"message": "open_new_tab", "url": "http://" + url + regex_match[0]});
        });
      }
    } else {
      alert("no match");
    }
  }
);
