Steps to run:

1. Install node.js. Node Package Manager (npm) should be included.
2. Clone or download TwitMap to a local folder in your computer.
3. Create an application in Twitter. (See https://apps.twitter.com)
4. Set-up your config.json with the required keys from the newly created Twitter application.
5. In terminal
- Run “npm install” to install required packages.
- Run “node app.js” 
6. Open a browser and navigate to “http://localhost:3001” 
7. Click on one of the supported countries on the map.

Note: It could take some time until tweets appear in the window. You can pause and continue the streaming while the popup is open. Clicking x or a point outside the popup will close the popup and terminate the stream.


Supported Countries:

Finland,
United States,
China,
India,
Russia,
Germany,
France,
Turkey,
South Africa,
Brazil,
Australia

Implementation: 

- Project contains a web-socket server, a web server and client configuration.
- Users land on the web page and open a country for establishin a connection to the web-socket server.
- Web sockets use Twitter Streaming Api to access tweets posted in given country and send the newly received tweets to the client.
- Client web page appends the tweet text which are received from the web socket.

Future Plans (In priority order from higher to lower priority):
1. Stabilise web-socket against fast switches in the streaming status.
2. Add more countries
3. Run lighter sockets on the background to bring posted tweet count to the map. Plan is to set filters over the country and blink whenever a new tweet is posted. 
4. Current black and white styling is nice but better fonts to popup window would increase the aesthetics.
5. A better representation of each tweet in the popup window: 
- Maybe images displayed? (Retweet and Likes might not be relevant since tweets are just posted)
- An idea could be embedding twitters own component with black and white filtering.
