var url_parser = require('../extension/url_parser.js');
// import {helloWorld} from "../extension/content.js";

describe('Hello world', function () {
  it('says hello', function () {
    expect(url_parser.helloWorld()).toEqual('Hello world!');
  });
});
