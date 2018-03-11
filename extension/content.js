chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let default_base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"]
    chrome.storage.sync.get({'base_urls' : default_base_urls}, function (result) {
      let base_urls = result.base_urls;
      open_urls(window.location.href, base_urls, request, chrome.runtime.sendMessage);
    });
  }
);
