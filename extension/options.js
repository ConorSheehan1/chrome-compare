function remove_option(id) {
  var elem = document.getElementById(id);
  elem.parentNode.removeChild(elem);
}

function set_form_fields(base_urls){
  let form = document.getElementById("form");
  // Clear previous contents of the form
  while (form.hasChildNodes()) {
      form.removeChild(form.lastChild);
  }
  // add base_urls to form
  for (i=0;i<base_urls.length;i++){
      let id = "url" + i;
      let label = document.createElement("label");
      label.for = id;
      label.innerHTML = id;

      let input = document.createElement("input");
      input.type = "text";
      input.name = id;
      input.value = base_urls[i];
      form.appendChild(input);
  }
}

function load_options() {
  let default_base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];
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
  document.getElementById("save").onclick = function(){
    save_options(["here!!"], default_base_urls);
  };

  // document.getElementById("url1").onclick = function() {
  //   remove_option("url1");
  // };

  console.log("load js");
};
