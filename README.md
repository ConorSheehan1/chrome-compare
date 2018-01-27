### Setup
1. Go to chrome://extensions/  
1. Click the developer mode checkbox  
1. Click load unpacked extension and select the extension folder in this repo 
1. Move config.js.EXAMPLE to config.js and customize the regex and base_urls  

### Usage
1. Click the icon  
1. If the url matches the regex in config.js you'll recieve a js confirm dialogue box  
1. If you click ok, the urls in base_url with the regex match appended, will open

### Purpose
This chrome extension can be used to compare versions of a site in new tabs.  
For example, open up the current site in production, the staging version, and a local version.   

### Credit
Based on [this tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension#load-your-extension-into-chrome)
