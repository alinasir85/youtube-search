const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const API = 'AIzaSyD9gV2AVci0RZDXEtm7IN0bu-JiQZSkCMg';

app.get('/:chId/:maxRec', (req, res, next) => {
    const channelId = req.params.chId;
    const maxRecords = req.params.maxRec
    let finalUrl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxRecords}`;

    function axiosTest() {
        const promise = axios.get(finalUrl)
        const dataPromise = promise.then((response) => response.data)
        return dataPromise;
    }

    axiosTest()
        .then(response => {
            const playlist = response.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
            res.json({playlist});
        })
        .catch(err => console.log(err));

});

app.listen(process.env.PORT || 5000);