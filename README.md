# chrome-compare 

[![Build Status](https://travis-ci.org/ConorSheehan1/chrome-compare.svg?branch=master)](https://travis-ci.org/ConorSheehan1/chrome-compare)
[![GitHub issues](https://img.shields.io/github/issues/ConorSheehan1/chrome-compare.svg)](ConorSheehan1/chrome-compare/issues)

This chrome extension can be used to compare the same page across multiple sites in new tabs.  
For example, it could be configured to open the production, staging, and local dev version of a site.  

![setup gif](setup.gif)

### Setup
1. Go to ```chrome://extensions/```  
1. Click the developer mode checkbox  
1. Click load unpacked extension and select the extension folder in this repo
1. Right click on the extension icon to customize the urls

### Usage
1. Click the icon.  
1. If the url contains any of the base_urls you've set in the options page, you'll recieve a confirm popup.  
1. If you click ok, each url in base_urls (with the page you're currently on appended to them) will open in a new tab.

#### Example
1. Follow [The Setup](#setup) and use config.js.example
1. Open google chrome and visit ```https://datascience.stackexchange.com/questions/tagged/python```
1. Click the chrome extension icon.
1. Click ok on the confim popup.
1. stackoverflow, askubuntu, and datascience.stackexchange should all open with questions tagged python.  
    Since all of these sites are part of the stackexchange group, most urls follow the same structure and can be opened in all three sites.

### Tests
1. Install [jasmine](https://github.com/jasmine/jasmine)
1. Run ```jasmine```

### Credit
Based on [this chrome extension tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension#load-your-extension-into-chrome)
and [this options page tutorial](https://www.youtube.com/watch?v=d4RPNh_m8gc)  
Screen to gif software: [Peek](https://github.com/phw/peek)  
