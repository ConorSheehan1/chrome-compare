var url_parser = require('../extension/url_parser.js');
var base_urls = require('../extension/config.js');

describe('build_regex', function() {
  // define regex match in advance
  var regex = url_parser.build_regex(base_urls);

  it('builds regex', function() {
    expect(regex).toEqual(
      /(https:\/\/stackoverflow.com|https:\/\/askubuntu.com|https:\/\/datascience.stackexchange.com)(?=(.*))/i
    );
  });

  function match_paths_after_base_url(input, output) {
    it(output + ' should be the last matched item from ' + input , function() {
      // run the regex match
      var matches = input.match(regex);
      // expect the last match to be everything added to the base_url
      var url_query = matches[matches.length -1];
      expect(url_query).toEqual(output);
    });
  }

  function no_match(input) {
    it('should not match' + input, function() {
      expect(input.match(regex)).toEqual(null);
    });
  }

  // check the regex will only match data after a base url
  base_urls.forEach(function(url) {
    var extended_path = "/questions/tagged/python";
    match_paths_after_base_url(url + extended_path, extended_path)
  });

  // check the regex will not match anything without a baseurl
  base_urls.forEach(function(url) {
    var extended_path = "/questions/tagged/python";
    no_match(url.substr(2, url.length) + extended_path);
  });

  // what happens if the base url changes
});
