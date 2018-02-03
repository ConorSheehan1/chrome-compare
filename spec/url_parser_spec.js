var url_parser = require('../extension/url_parser.js');
var base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];
var request = {"message":"clicked_browser_action"};
// stub alert and confirm
alert = jasmine.createSpy("alert");
confirm = jasmine.createSpy("confirm");


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
      expect(url_parser.get_path(matches)).toEqual(output);
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


describe('base_urls_except', function() {
  var except_this_string = "https://stackoverflow.com";
  it('returns the base_urls, except for ' + except_this_string, function() {
    // if you pass the first item in base_urls to base_urls_except, you should get back everything except the first item
    expect(url_parser.base_urls_except(base_urls, base_urls[0])).toEqual(base_urls.slice(1))
  });
});


describe('open_urls', function() {
  it('returns an alert when no match is found', function(){
    var current_url = "https://not.in.base_urls";
    url_parser.open_urls(current_url, base_urls, request, console.log, false);
    expect(alert).toHaveBeenCalledWith("no match");
  });

  it('returns all urls to be opened when a match is founded', function(){
    var current_url = base_urls[0];
    url_parser.open_urls(current_url, base_urls, request, console.log, false);
    expect(confirm).toHaveBeenCalledWith("open the following urls?" + base_urls.map(url => "\n" + url));
  });

  it('returns all urls except the current one when exclude_current is true', function(){
    var current_url = base_urls[0];
    var urls_to_open = url_parser.base_urls_except(base_urls, current_url).map(url => "\n" + url);
    url_parser.open_urls(current_url, base_urls, request, console.log, true);
    expect(confirm).toHaveBeenCalledWith("open the following urls?" + urls_to_open);
  });

  it('adds path of url match to all base_urls', function(){
    var added_path = "/add/this/stuff"
    var current_url = base_urls[0] + added_path;
    var urls_to_open = base_urls.map(url => "\n" + url + added_path);
    url_parser.open_urls(current_url, base_urls, request, console.log, false);
    expect(confirm).toHaveBeenCalledWith("open the following urls?" + urls_to_open);
  });   

  it('adds path of url match to all base_urls except the current one when exclude_current is true', function(){
    var added_path = "/add/this/stuff"
    var current_url = base_urls[0] + added_path;
    // need to pass base url without added path to base_urls_except
    var urls_to_open = url_parser.base_urls_except(base_urls, base_urls[0]).map(url => "\n" + url + added_path);
    url_parser.open_urls(current_url, base_urls, request, console.log, true);
    expect(confirm).toHaveBeenCalledWith("open the following urls?" + urls_to_open);

  });
});
