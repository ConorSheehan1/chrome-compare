"use strict"; 
let webdriver = require("selenium-webdriver");
let chrome = require('selenium-webdriver/chrome');

function encode(file) {
    var stream = require('fs').readFileSync(file);
    return new Buffer(stream).toString('base64');
}

let options = new chrome.Options();
options.addExtensions(encode('../extension.crx'));

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

driver.get("chrome://extensions");
