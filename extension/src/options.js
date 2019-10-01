/* eslint no-plusplus: "off", no-restricted-globals: "off", func-names: "off" */

function reset_chrome_storage_base_urls() {
  // note to share default_base_urls with window.onload would need class or closure.
  // otherwise default_base_urls will only work from within options.js.
  chrome.storage.sync.set({
    base_urls: [
      'https://stackoverflow.com',
      'https://askubuntu.com',
      'https://datascience.stackexchange.com',
    ],
  });
}

// just check if it starts with http or https and has a domain or ip
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function is_url(str) {
  const pattern = new RegExp('^(http|https):\\/\\/' // protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\\.){3}\\d{1,3}))'); // OR ip (v4) address
  return pattern.test(str);
}

function add_base_url(url) {
  const message = "That doesn't look like a url.\nAre you sure you want to add that?";
  let success = true;
  if (!is_url(url) && !confirm(message)) {
    return false;
  }
  chrome.storage.sync.get('base_urls', (result) => {
    const { base_urls } = result;
    // make sure base urls are unique
    if (base_urls.includes(url)) {
      alert(`url${base_urls.indexOf(url) + 1} is already ${url}\nbase_urls must be unique.`);
      success = false;
    }
    base_urls.push(url);
    chrome.storage.sync.set({ base_urls });
  });
  return success;
}

function remove_base_url(url) {
  // if we get to this point base urls must already exist, so no need for default value
  chrome.storage.sync.get('base_urls', (result) => {
    const { base_urls } = result;
    // if the url is not in base_urls we should throw an exception
    const index = base_urls.indexOf(url);
    if (index < 0) {
      throw new Error(`${url} was not in chrome storage but was on the options page.`);
    }
    const base_urls_removed = base_urls.filter((e) => e !== url);
    chrome.storage.sync.set({ base_urls: base_urls_removed });
  });
}

function display_url_ui(form, url, i) {
  const id = `url${i + 1}`;
  const remove_id = `remove_${url}`;

  const label = document.createElement('label');
  label.for = id;
  label.innerHTML = `${id}: `;

  const remove_input = document.createElement('input');
  remove_input.type = 'button';
  remove_input.value = '-';
  remove_input.id = remove_id;

  const input = document.createElement('input');
  input.type = 'text';
  input.name = id;
  input.value = url;
  input.disabled = true;

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(remove_input);
  // TODO: use css instead
  form.appendChild(document.createElement('br'));

  // need function here to get this in scope.
  remove_input.onclick = function () {
    const url_to_remove = this.id.replace('remove_', '');
    remove_base_url(url_to_remove);
    window.location.reload();
  };
}

function display_add_ui(form) {
  const id = 'new_url';
  const label = document.createElement('label');
  label.for = id;
  label.innerHTML = 'new url: ';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = id;
  input.id = id;

  const add_input = document.createElement('input');
  add_input.type = 'button';
  add_input.value = '+';

  add_input.onclick = () => {
    const new_url_input = document.getElementById(id);
    const url = new_url_input.value.trim();
    add_base_url(url);
    window.location.reload();
  };

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(add_input);
  // TODO: use css instead
  form.appendChild(document.createElement('br'));
  form.appendChild(document.createElement('br'));
}

function set_form_fields(base_urls) {
  const form = document.getElementById('form');
  // Clear previous contents of the form
  while (form.hasChildNodes()) {
    form.removeChild(form.lastChild);
  }
  // add base_urls to form
  for (let i = 0; i < base_urls.length; i++) {
    const url = base_urls[i];
    display_url_ui(form, url, i);
  }

  // add option to add more base urls
  display_add_ui(form);

  // add option to reset
  const reset_button = document.createElement('input');
  reset_button.type = 'button';
  reset_button.value = 'reset';
  reset_button.id = 'reset';
  reset_button.onclick = () => {
    reset_chrome_storage_base_urls();
    window.location.reload();
  };
  form.appendChild(reset_button);
}

function load_options(default_base_urls) {
  chrome.storage.sync.get('base_urls', (result) => {
    let { base_urls } = result;
    if (base_urls) {
      set_form_fields(base_urls);
    } else {
      // if the base urls aren't in chrome storage, set them
      chrome.storage.sync.set({ base_urls: default_base_urls });
      base_urls = default_base_urls;
    }
  });
}


// Export node module for tests
if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = {
    is_url,
    add_base_url,
    remove_base_url,
    reset_chrome_storage_base_urls,
  };
} else {
  // otherwise, render options page in browser
  window.onload = () => {
    load_options([
      'https://stackoverflow.com',
      'https://askubuntu.com',
      'https://datascience.stackexchange.com',
    ]);
  };
}
