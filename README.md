### Setup
1. Go to chrome://extensions/  
1. Click the developer mode checkbox  
1. Click load unpacked extension and select the extension folder in this repo 
1. Copy extension/config.js.EXAMPLE to extension/config.js  
    ```cp extension/config.js.EXAMPLE extension/config.js```
1. customize the regex and base_urls  

### Usage
1. Click the icon  
1. If the url matches the regex in config.js you'll recieve a js confirm popup  
1. If you click ok, the urls in base_url with the regex match appended, will open

### Purpose
* This chrome extension can be used to compare sites in new tabs.  
    For example, it could be configured to open the production, staging, and local dev version of a site to comparison pages.  

* The example configuration in config.js.EXAMPLE will open stack overflow and askubuntu with questions tagged python
if the current url contains "questions/tagged/python"  

### Credit
Based on [this tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension#load-your-extension-into-chrome)
