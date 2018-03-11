var ws = require("nodejs-websocket")
var nconf = require('nconf');
var Twit = require('twit');

var locations = {
    finland: '21,59,29,67',
    us: '-125,33,-66,44',
    germany: '8,48,13,54',
    turkey: '27,36,43,41',
    france: '-4,44,7,49',
    india: '68,8,86,26',
    china: '100,23,124,43',
    russia: '34,53,177,70',
    australia: '110,-38,153,-12',
    southafrica: '16,-35,31,-23',
    brazil: '-54,-27,-32,4'
};

var tweetStream = {}
var connected = false;

function start()
{
    // Scream server example: "hi" -> "HI!!!"
    var websocketServer = ws.createServer(function (connection) {
        console.log('New connection')
        connection.on('text', function (location) {
            console.log('Location: ' + location);
            connected = true;
            nconf.file({ file: 'config.json' }).env();

            var twitter = new Twit({
              consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
              consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
              access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
              access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
            });

            tweetStream = twitter.stream('statuses/filter', { locations: locations[location] });
            tweetStream.on('tweet', function (tweet) {
                if (tweet) {
                    var date = new Date(
                        tweet.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
                        "$1 $2 $4 $3 UTC"));
                    // TODO : Find a better format for date.
                    var text = '[' + date.toLocaleString() + '] ' + tweet.user.name + ": " + tweet.text;
                    console.log(tweet);
                    if (connected) {
                        connection.sendText(text);        
                    }
                }
            });
        })

        connection.on('close', function () {
            connected = false;
            console.log('Connection closed');

            if (tweetStream !== null) {  
                tweetStream.stop();
                tweetStream = null;
            }
        })
    });

    websocketServer.listen(8081);
}

module.exports.start = start;