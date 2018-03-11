function remove_option(id) {
  var elem = document.getElementById(id);
  elem.parentNode.removeChild(elem);
}

function save_options() {
  let default_base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];
  chrome.storage.sync.get({'base_urls' : default_base_urls}, function (result) {
    let base_urls = result.base_urls;
    base_urls.push("test");
    console.log(base_urls);
    chrome.storage.sync.set({"base_urls": base_urls});
  });
  
}

window.onload = function(){ 
  document.getElementById("save").onclick = save_options;

  // document.getElementById("url1").onclick = function() {
  //   remove_option("url1");
  // };

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



