

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // build regex with look ahead that will match any of the base urls
    // and then add whatever comes after the baseurl to the last capture group 
    var regex_string = "(" + base_urls.join("|") + ")(?=(\.*))";
    var regex_capture_groups = new RegExp(regex_string, "i");
    var matches = window.location.href.match(regex_capture_groups);

    if (matches) {
      // the part of the url we want to keep will be caught by the look ahead capture group, 
      // so it will be at the end of the matches array
      var url_query = matches[matches.length -1];
      if( confirm("open the following urls?\n" + base_urls) && request.message === "clicked_browser_action" ) {
        base_urls.forEach( function(url) {
          chrome.runtime.sendMessage({"message": "open_new_tab", "url": url + url_query});
        });
      }
    } else {
      alert("no match");
    }
  }
);
