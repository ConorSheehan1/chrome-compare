var url_parser = require('../extension/url_parser.js');
var base_urls = require('../extension/config.js');

describe('build_regex', function() {
  var regex = url_parser.build_regex(base_urls);

  it('builds regex', function() {
    expect(regex).toEqual(
      /(https:\/\/stackoverflow.com|https:\/\/askubuntu.com|https:\/\/datascience.stackexchange.com)(?=(.*))/i
    );
  });

  function match_paths_after_base_url(input, output) {
    it('should match ' + output + ' only from ' + input, function() {
      // run the regex match
      var matches = input.match(regex)
      // expect the last match to be everything added to the base_url
      var url_query = matches[matches.length -1];
      expect(url_query).toEqual(output);
    });
  }

  base_urls.forEach(function(url) {
    var extended_path = "/questions/tagged/python";
    match_paths_after_base_url(url + extended_path, extended_path)
  });

  // it('matches paths after any base url', function() {
  //   // append path to all base urls
  //   var tagged_python = base_urls.map(function(x){return x+"/questions/tagged/python"});
  // });
});
