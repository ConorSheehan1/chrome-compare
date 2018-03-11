window.onload = function(){ 
  function remove(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
  }

  function save_options() {
    let base_urls = chrome.storage.sync.get("base_urls");
    base_urls.push("test");
    chrome.storage.sync.set({"base_urls": base_urls});
  }

  var elem = document.getElementById("save");
  elem.onclick = save_options;

  console.log("load js");
};

// // config.js
/* 
if the current url contains https://stackoverflow.com, https://askubuntu.com, or https://datascience.stackexchange.com
iterate over the urls and add whatever page you're currently on to the end.

for example https://stackoverflow.com/?tab=featured will open
https://stackoverflow.com/?tab=featured, https://askubuntu.com/?tab=featured and https://datascience.stackexchange.com/?tab=featured
*/

// var base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];
// var exclude_current_url = true;

// // Export node module.
// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
// {
//     module.exports = base_urls;
// }



