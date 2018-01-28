var url_parser = require('../extension/url_parser.js');
var base_urls = require('../extension/config.js');

describe('build_regex', function() {
  // define default_regex match in advance
  var default_regex = url_parser.build_regex(base_urls);
  var extended_path = "/questions/tagged/python";

  it('builds regex', function() {
    expect(default_regex).toEqual(
      /(https:\/\/stackoverflow.com|https:\/\/askubuntu.com|https:\/\/datascience.stackexchange.com)(?=(.*))/i
    );
  });

  function match_paths_after_base_url(input, output, regex) {
    it(output + ' should be the last matched item from ' + input , function() {
      // run the regex match
      var matches = input.match(regex);
      // expect the last match to be everything added to the base_url
      var url_query = matches[matches.length -1];
      expect(url_query).toEqual(output);
    });
  }

  function no_match(input, regex) {
    it('should not match' + input, function() {
      expect(input.match(regex)).toEqual(null);
    });
  }

  base_urls.forEach(function(url) {
    // check the regex will only match data after a base url
    match_paths_after_base_url(url + extended_path, extended_path, default_regex);
    // check the regex will not match anything without a baseurl 
    // (by removing the first two chars from each baseurl)
    no_match(url.substr(2, url.length) + extended_path, default_regex);
  });

  var modified_base = base_urls.map(function(x){return x + "/should_not_match_this"});
  var modified_regex = url_parser.build_regex(modified_base);
  modified_base.forEach(function(url) {
    // if we add to the end of the url, we should still get the same match
    // only extended_path should get matched
    match_paths_after_base_url(url + extended_path, extended_path, modified_regex);
  });

});
