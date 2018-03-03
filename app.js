'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PythonShell = require('python-shell');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'nxqCRpO5TTOqi7Yu32LJDY2Wx',
    consumer_secret: 'qsc5mYhOZ7JVKy2hIRr9YAzBZm6hHooCGtBPmvZk2DbPO0Ivvh',
    access_token_key: '',
    access_token_secret: ''
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/emotion_stats', (req, res) => {

    // var params = {
    //     screen_name: req.query.screen_name
    //     // user_id: req.query.user_id
    // };

    var params = req.query;
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
            const tweets_array = tweets.map(x => x.text);
            
            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                args: ['-tweets', tweets_array],
                scriptPath: '.'
            };
            PythonShell.run('analyse_emotions.py', options, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log('results: %j', results);
              });

            res.status(200).send(tweets_array);

        } else {
            console.log(error);
        }
    });


});




app.listen(8080, () => {
    console.log('Listening on port 8080...');
});