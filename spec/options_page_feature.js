// // "use strict"; 

// function encode(file) {
//     var stream = require('fs').readFileSync(file);
//     return new Buffer(stream).toString('base64');
// }

// let webdriver = require('selenium-webdriver');
// let chrome = require('selenium-webdriver/chrome');
// let test = require('selenium-webdriver/testing');

// let options = new chrome.Options();
// // load compiled extension
// options.addExtensions(encode('extension.crx'));

// let driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .setChromeOptions(options)
//     .build();

// // driver.get("chrome://extensions");
// let extensionId = "ajkmeafjppdaejdhdhhcmbaiipehdhnm";

// // beforeAll(function() {
// // });

var webdriver = require('selenium-webdriver') // Added line
var By = require('selenium-webdriver').By,
  until = require('selenium-webdriver').until,
  chrome = require('selenium-webdriver/chrome'),
  test = require('selenium-webdriver/testing');

test.describe('Google Search', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder().forBrowser('chrome').build() // Changed line
  });

  test.after(function() {
    driver.quit();
  });

  test.it('should append query to title', function() {
    driver.get('http://www.google.com/ncr');
    driver.findElement(By.name('q')).sendKeys('webdriver');
    driver.findElement(By.name('btnG')).click();
    driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });
});


// test.describe('add url feature', function(){
//   test.it('lets you add valid, unique, urls', function() {
//     driver.get("chrome-extension://" + extensionId + "/options.html");
//     // console.log(driver);
//   });
// });





