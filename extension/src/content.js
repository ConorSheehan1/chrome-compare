chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const default_base_urls = ['https://stackoverflow.com', 'https://askubuntu.com', 'https://datascience.stackexchange.com'];
    chrome.storage.sync.get({ base_urls: default_base_urls }, (result) => {
      open_urls(window.location.href, result.base_urls, request, chrome.runtime.sendMessage);
    });
  },
);
