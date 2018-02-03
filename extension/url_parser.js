function build_regex(base_urls) {
  // build regex with look ahead that will match any of the base urls
  // and then add whatever comes after the baseurl to the last capture group 
  var regex_string = "(" + base_urls.join("|") + ")(?=(\.*))";
  return new RegExp(regex_string, "i");
}

//http://test.com(/the/path/gets/matched)
function get_path(regex_match) {
  return regex_match[regex_match.length-1];
}

//(http://this.gets.matched)/some/path/not/matched
function get_domain(regex_match) {
  return regex_match[0];
}

function base_urls_except(base_urls, except){
  return base_urls.filter(url => url != except);
}

function open_urls(current_url, base_urls, request, callback_to_open_url, exclude_current_url) {
  var matches = current_url.match(build_regex(base_urls));

  if (matches) {
    var url_path = get_path(matches);
    if (exclude_current_url) {
      // get all base urls except the current url and add the path to the end of them
      var urls_to_open = base_urls_except(base_urls, get_domain(matches)).map(url => url + url_path);
    } else {
      var urls_to_open = base_urls.map(url => url + url_path);
    }

    if (confirm("open the following urls?" + urls_to_open.map(url => "\n" + url)) 
      && request.message === "clicked_browser_action") {
      urls_to_open.forEach( function(url) {
        callback_to_open_url({"message": "open_new_tab", "url": url});
      });
    }
  } else {
    alert("no match");
  }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = {
      open_urls: open_urls,
      build_regex: build_regex,
      base_urls_except: base_urls_except,
      get_path: get_path
    }
}

