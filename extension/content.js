chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    open_urls(window.location.href, base_urls, request, chrome.runtime.sendMessage, exclude_current_url);
  }
);


