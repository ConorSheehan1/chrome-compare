const options = require('../extension/src/options.js');

// stub alert and confirm
alert = jasmine.createSpy('alert');
confirm = jasmine.createSpy('confirm');

// TODO: move to helper. stub chrome storage (global var, refactor?)
// https://stackoverflow.com/a/48707505/6305204
// can modify const, just not reassign?
const chrome_internal_mock = {};

chrome = {
  storage: {
    sync: {
      set(dict) {
        const key = Object.keys(dict)[0];
        const value = Object.values(dict)[0];
        // use slice to make copy of array, don't mutate original!
        chrome_internal_mock[key] = value.slice();
        return true;
      },
      get(key, func) {
        if (chrome_internal_mock[key]) {
          return func(chrome_internal_mock);
        }
        // TODO: is this necessary? just satisifes lint rule, only used in test.
        return undefined;
      },
    },
  },
};

// default test values
// make sure valid_domain isn't already in default_base_urls
// to account for uniqueness constraint in add_base_url
const valid_domain = 'http://stackoverflow.com';
const invalid_domain = 'http://__';
const valid_ip = 'http://127.0.0.1';
const invalid_ip = 'http://0';
const default_base_urls = [
  'https://stackoverflow.com',
  'https://askubuntu.com',
  'https://datascience.stackexchange.com',
];


describe('is_url', () => {
  it('matches valid domains', () => {
    expect(options.is_url(valid_domain)).toEqual(true);
  });

  it('matches valid ips', () => {
    expect(options.is_url(valid_ip)).toEqual(true);
  });

  it('does not matche invalid domains', () => {
    expect(options.is_url(invalid_domain)).toEqual(false);
  });

  it('does not matche invalid ips', () => {
    expect(options.is_url(invalid_ip)).toEqual(false);
  });
});

describe('add_base_url', () => {
  beforeEach(() => {
    chrome.storage.sync.set({ base_urls: default_base_urls });
    // check the chrome storage is set correctly
    expect(chrome.storage.sync.get(
      'base_urls', (result) => result.base_urls,
    )).toEqual(default_base_urls);
  });

  it('rejects duplicate urls', () => {
    const message = 'url1 is already https://stackoverflow.com\nbase_urls must be unique.';
    expect(options.add_base_url('https://stackoverflow.com')).toEqual(false);
    expect(alert).toHaveBeenCalledWith(message);
  });

  it('rejects invalid urls', () => {
    confirm.and.returnValue(false);
    const message = "That doesn't look like a url.\nAre you sure you want to add that?";
    expect(options.add_base_url(invalid_domain)).toEqual(false);
    expect(confirm).toHaveBeenCalledWith(message);
  });

  it('accepts invalid urls if forced', () => {
    confirm.and.returnValue(true);
    const message = "That doesn't look like a url.\nAre you sure you want to add that?";
    expect(options.add_base_url(invalid_domain)).toEqual(true);
    expect(confirm).toHaveBeenCalledWith(message);
  });

  it('accepts valid urls', () => {
    expect(options.add_base_url(valid_domain)).toEqual(true);
  });
});

describe('remove_base_url', () => {
  beforeEach(() => {
    chrome.storage.sync.set({ base_urls: default_base_urls });
    // check the chrome storage is set correctly
    expect(chrome.storage.sync.get(
      'base_urls', (result) => result.base_urls,
    )).toEqual(default_base_urls);
  });

  it('removes base urls if they exist', () => {
    options.remove_base_url('https://stackoverflow.com');
    const base_urls_removed = ['https://askubuntu.com', 'https://datascience.stackexchange.com'];
    // check the correct url is removed
    expect(chrome.storage.sync.get(
      'base_urls', (result) => result.base_urls,
    )).toEqual(base_urls_removed);
  });

  it('throws an exception if a remove for a base url which does not exist is attempted', () => {
    // need to use anonymous function when expecting exception
    // https://stackoverflow.com/questions/4144686/how-to-write-a-test-which-expects-an-error-to-be-thrown-in-jasmine
    const missing_url_error = new Error('https://asdf.com was not in chrome storage but was on the options page.');
    expect(
      () => {
        options.remove_base_url('https://asdf.com');
      },
    ).toThrow(missing_url_error);
  });
});

describe('reset_chrome_storage_base_urls', () => {
  it('resets the base urls in chrome storage', () => {
    const invalid_base_urls = ['asdf', invalid_ip, invalid_domain];
    chrome.storage.sync.set({ base_urls: invalid_base_urls });
    // check the chrome storage is set correctly
    expect(chrome.storage.sync.get(
      'base_urls', (result) => result.base_urls,
    )).toEqual(invalid_base_urls);

    options.reset_chrome_storage_base_urls();
    expect(chrome.storage.sync.get(
      'base_urls', (result) => result.base_urls,
    )).toEqual(default_base_urls);
  });
});
