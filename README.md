### Purpose
This chrome extension can be used to compare versions of site in new tabs.  
I often found myself opening multiple versions of a site I'm working on.  
For example, I'd open up the current site in production, the staging version of the site, and my local version.  
Opening each of these tabs manually was pretty tedious, so I made this little chrome extension.  
When you click the icon, if the current url matches the regex content.js, 

### Setup
1. Go to chrome://extensions/  
1. CLick the developer mode checkbox  
1. Click load unpacked extension and select the extension folder in this repo 
1. Move config.js.EXAMPLE to config.js and customize the regex and base_urls  


### Credit
Based on [this tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension#load-your-extension-into-chrome)
