function remove_base_url(url) {
  // if we get to this point base urls must already exist, so no need for default value
  chrome.storage.sync.get('base_urls', function(result){
    let base_urls = result.base_urls;
    // console.log(base_urls, url);
    // if the url is not in base_urls we should throw an exception
    let index = base_urls.indexOf(url);
    if (index < 0){
      throw new Error(url + " was not in chrome storage but was on the options page.");
    }
    // base_urls.pop(index);
    let base_urls_removed = base_urls.filter(e => e !== url);
    chrome.storage.sync.set({"base_urls": base_urls_removed});
    // console.log("saved base_urls: " + base_urls_removed);
  })
}

function add_base_url(url) {
  let message = "That doesn't look like a url.\nAre you sure you want to add that?";
  if (!is_url(url) && !confirm(message)) {
    return false;
  }
  chrome.storage.sync.get('base_urls', function(result){
    let base_urls = result.base_urls;

    // // make sure base urls are unique
    // if (base_urls.includes(url)) {
    //   alert(url + " is already in base_urls")
    //   return false;
    // }

    base_urls.push(url);
    chrome.storage.sync.set({"base_urls": base_urls});
    // console.log("saved base_urls: " + base_urls);
  })
  return true
}

// just check if it starts with http or https and has a domain or ip
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function is_url(str) {
  let pattern = new RegExp('^(http|https):\\/\\/'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'); // OR ip (v4) address
  return pattern.test(str);
}


function display_url_ui(form, url, i) {
    let id = "url" + (i+1);
    let remove_id = "remove_" + url

    let label = document.createElement("label");
    label.for = id;
    label.innerHTML = id + ": ";

    let remove_input = document.createElement("input");
    remove_input.type = "button";
    remove_input.value = "-";
    remove_input.id = remove_id;

    let input = document.createElement("input");
    input.type = "text";
    input.name = id;
    input.value = url;
    input.disabled = true;

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(remove_input);
    // TODO: use css instead
    form.appendChild(document.createElement("br"));
    // form.appendChild(document.createElement("br"));

    // TODO: look in to having last input be same format as above inputs but with plus button beside instead of minus
    // clicking plus would write to chrome storage and add new empty input below
    // possibly change label of input from new_url to url(n+1)
    // also break this function up (function to add inputs with same layout (label, input, add/remove button))
    remove_input.onclick = function() {
      let url = this.id.replace("remove_", "");
      // console.log(url)
      remove_base_url(url);
      location.reload();
    }
}

function display_add_ui(form) {
  let id = "new_url";
  let add_id = "add_" + id;

  let label = document.createElement("label");
  label.for = id;
  label.innerHTML = "new url: ";

  let input = document.createElement("input");
  input.type = "text";
  input.name = id;
  input.id = id;

  let add_input = document.createElement("input");
  add_input.type = "button";
  add_input.value = "+";

  add_input.onclick = function() {
    let new_url_input = document.getElementById(id);
    let url = new_url_input.value.trim();
    add_base_url(url);
    location.reload(); 
  }

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(add_input);
  // TODO: use css instead
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));

}

function set_form_fields(base_urls) {
  let form = document.getElementById("form");
  // Clear previous contents of the form
  while (form.hasChildNodes()) {
    form.removeChild(form.lastChild);
  }
  // console.log(base_urls);
  // add base_urls to form
  for (i=0;i<base_urls.length;i++) {
    let url = base_urls[i];
    display_url_ui(form, url, i);
  }

  // add option to add more base urls
  display_add_ui(form);

  // add option to reset
  let reset_button = document.createElement("input");
  reset_button.type = "button";
  reset_button.value = "reset";
  reset_button.id = "reset";
  reset_button.onclick = function(){
    reset_chrome_storage();
    location.reload();
  }
  form.appendChild(reset_button);

}

function load_options(default_base_urls) {
  let form = document.getElementById("form");
  chrome.storage.sync.get('base_urls', function (result) {
    let base_urls = result.base_urls;
    // if the base urls aren't in chrome storage, set them
    if (!result.base_urls) {
      chrome.storage.sync.set({'base_urls': default_base_urls});
      base_urls = default_base_urls;
    }
    set_form_fields(base_urls);
  });
}

function reset_chrome_storage(){
  chrome.storage.sync.set(
    {"base_urls": ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"]}
  );
}


// Export node module for tests
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = {
      is_url: is_url,
      add_base_url: add_base_url,
      remove_base_url: remove_base_url
    };
} else {
// otherwise, actually render options page
  window.onload = function(){   
    let default_base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];
    load_options(default_base_urls);
  };
}
