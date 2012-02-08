#### DCNews
Three folders
:DCX Server . a simple nodejs server (express +jade)
:DCX Extract . mainly used to extract webpage content and save to mysql db (readability)
:DCX Spider . a spider used to spider article url and save to mysql db (but now it ues rss as the resource)

How to Run the Server:

.setup your local mysql db
.use spider to collect articl url
.use extract to extract main content of all these urls
."cd DCXServer" ,"node server.js" start the local server 

