let options = require('../extension/src/options.js');

// stub alert and confirm
alert = jasmine.createSpy("alert");
confirm = jasmine.createSpy("confirm");

// stub chrome storage (global var, refactor?)
chrome_internal_mock = {};
chrome = {
  storage: {
    sync: {
      set: function(dict) {
        key = Object.keys(dict)[0];
        value = Object.values(dict)[0];
        chrome_internal_mock[key] = value;
        return true;
      },
      get: function(key, func) {
        if (chrome_internal_mock[key]){
          value = chrome_internal_mock;
          return func(value);
        }
      }
    }
  }
};

// default test values
let valid_domain = "https://stackoverflow.com";
let invalid_domain = "http://__";
let valid_ip = "http://127.0.0.1";
let invalid_ip = "http://0"
let base_urls = ["https://stackoverflow.com", "https://askubuntu.com", "https://datascience.stackexchange.com"];


describe('is_url', function(){
  it('matches valid domains', function() {
    expect(options.is_url(valid_domain)).toEqual(true);
  });

  it('matches valid ips', function() {
    expect(options.is_url(valid_ip)).toEqual(true);
  });

  it('does not matche invalid domains', function() {
    expect(options.is_url(invalid_domain)).toEqual(false);
  });

  it('does not matche invalid ips', function() {
    expect(options.is_url(invalid_ip)).toEqual(false);
  });
});

describe('add_base_url', function(){
  it('rejects invalid urls', function(){
    confirm.and.returnValue(false);
    let message = "That doesn't look like a url.\nAre you sure you want to add that?";
    expect(options.add_base_url(invalid_domain)).toEqual(false);
    expect(confirm).toHaveBeenCalledWith(message);
  });

  it('accepts invalid urls if forced', function(){
    confirm.and.returnValue(true);
    let message = "That doesn't look like a url.\nAre you sure you want to add that?";
    expect(options.add_base_url(invalid_domain)).toEqual(true);
    expect(confirm).toHaveBeenCalledWith(message);
  });

  it('accepts valid urls', function(){
    expect(options.add_base_url(valid_domain)).toEqual(true);
  });
});

describe('remove_base_url', function(){
  it('removes base urls if they exist', function(){
    chrome.storage.sync.set({"base_urls":base_urls});
    // check the chrome storage is set correctly
    expect(chrome.storage.sync.get(
      'base_urls', function(result){
      return result.base_urls;})
    ).toEqual(base_urls);
    options.remove_base_url("https://stackoverflow.com");
    let base_urls_removed = ["https://askubuntu.com", "https://datascience.stackexchange.com"];
    // check the correct url is removed
    expect(chrome.storage.sync.get(
        'base_urls', function(result){
        return result.base_urls;})
      ).toEqual(base_urls_removed);
  });

  it('throws an exception if a remove for a base url which does not exist is attempted', function(){
    chrome.storage.sync.set({"base_urls":base_urls});
    // check the chrome storage is set correctly
    expect(chrome.storage.sync.get(
      'base_urls', function(result){
      return result.base_urls;})
    ).toEqual(base_urls);
    // need to use anonymous function when expecting exception
    // https://stackoverflow.com/questions/4144686/how-to-write-a-test-which-expects-an-error-to-be-thrown-in-jasmine
    let missing_url_error = new Error("https://asdf.com was not in chrome storage but was on the options page.");
    expect(
      function(){
        options.remove_base_url("https://asdf.com");
      }).toThrow(missing_url_error);
  });
});

