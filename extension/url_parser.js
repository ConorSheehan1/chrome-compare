var helloWorld = function() {
  return "Hello world!";
}

var build_regex = function(base_urls) {
  // build regex with look ahead that will match any of the base urls
  // and then add whatever comes after the baseurl to the last capture group 
  var regex_string = "(" + base_urls.join("|") + ")(?=(\.*))";
  return new RegExp(regex_string, "i");
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = {
      helloWorld: helloWorld,
      build_regex: build_regex
    }
}

