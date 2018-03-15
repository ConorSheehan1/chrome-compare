let options = require('../extension/options.js');

// stub chrome storage
let chrome = {
  storage: {
    sync: {
      set: function() {},
      get: function() {}
    }
  }
}

describe('is_url', function(){
  let valid_domain = "https://stackoverflow.com";
  let invalid_domain = "http://__";
  let valid_ip = "http://127.0.0.1";
  let invalid_ip = "http://0"

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
  
});

