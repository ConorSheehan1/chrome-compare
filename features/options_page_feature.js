"use strict"; 
let webdriver = require("selenium-webdriver"),
SeleniumServer = require("selenium-webdriver/remote").SeleniumServer;

let caps = {
    'name': 'Chrome extension options page test',
    'build': '1.0',
    'browserName': 'google chrome'
}

let driver = new webdriver.Builder()
    // .usingServer(cbtHub)
    .withCapabilities(caps)
    .build(); 

driver.get("chrome://extensions");
