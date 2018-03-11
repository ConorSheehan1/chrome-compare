function remove_base_url(url) {
  // if we get to this point base urls must already exist, so no need for default value
  chrome.storage.sync.get('base_urls', function(result){
    let base_urls = result.base_urls;
    console.log(base_urls, url);
    // if the url is not in base_urls we should throw an exception
    let index = base_urls.indexOf(url);
    if (index < 0){
      throw 'Error: ' + url + " was not in chrome storage but was on the options page.";
    }
    base_urls.pop(index);
    chrome.storage.sync.set({"base_urls": base_urls});
    console.log("saved base_urls: " + base_urls);
  })
}

function set_form_fields(base_urls) {
  let form = document.getElementById("form");
  // Clear previous contents of the form
  while (form.hasChildNodes()) {
    form.removeChild(form.lastChild);
  }
  // add base_urls to form
  for (i=0;i<base_urls.length;i++) {
    let url = base_urls[i];
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

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(remove_input);
    // TODO: use css instead
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));


    document.getElementById(remove_id).onclick = function() {
      let url = this.id.replace("remove_", "");
      remove_base_url(url);
      location.reload();
    }
  }

  let add_button = document.createElement("input");
  add_button.type = "button";
  add_button.value = "+";
  add_button.id = "add";
  add_button.onclick = function() {
    // form.insertBefore(document.getElementById("url1"), document.createElement("input"));

  }

  let submit_button = document.createElement("input");
  submit_button.type = "submit";
  submit_button.value = "Save";
  submit_button.id = "save";

  form.appendChild(add_button);
  form.appendChild(submit_button);
}

function load_options(default_base_urls) {
  let form = document.getElementById("form");
  chrome.storage.sync.get({'base_urls' : default_base_urls}, function (result) {
    let base_urls = result.base_urls;
    set_form_fields(base_urls);
  });
}

function save_options(new_base_urls, default_base_urls) {
  // if base_urls is not in chrome storage, use default value
  chrome.storage.sync.get({'base_urls' : default_base_urls}, function (result) {
    let base_urls = result.base_urls;

    // add new url only if it's not already in base_urls
    new_base_urls.forEach(function(url){
      if (!base_urls.includes(url)) {
        base_urls.push(url);
      } else {
        console.log(url + "already in base_urls");
      }
    });
    chrome.storage.sync.set({"base_urls": base_urls});
    console.log("saved base_urls: " + base_urls);
  });
}


window.onload = function(){   
  let default_base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];
  load_options(default_base_urls);

  document.getElementById("save").onclick = function(){
    save_options(["here!!"], default_base_urls);
  };

  // document.getElementById("url1").onclick = function() {
  //   remove_option("url1");
  // };

  console.log("load js");
};




function reset_chrome_storage(){
  chrome.storage.sync.set(
    {"base_urls": ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"]}
  );
}
