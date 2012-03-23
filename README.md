## DCNews
###Three folders

1. **DCX Server** . a simple nodejs server (`express +jade`)

2. **DCX Extract** . mainly used to extract webpage content and save to mysql db (`readability`)
3. **DCX Spider** . a spider used to spider article url and save to mysql db (but now it ues rss as the resource)

###How to Run the Server:

1. setup your local `mysql` db

2. use spider to collect articl url

3. use extract to extract main content of all these urls

4. "`cd DCXServer`" ,"`node server.js`" start the local server 

