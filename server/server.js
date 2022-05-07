const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const { validation } = require('./validation');
const path = require('path');

app.get('/api/v1/weather', cors(), async function (req, res){
    const location = req.query.location;
    if(validation(location)) {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: location,
                    appid: process.env.API_KEY,
                    units: 'metric'
                }
            });
            res.send(response.data);
        } catch(error) {
            res.status(error.response.data.cod).send(error.response.data.message);
        }
    } else {
        res.status(400).send('Invalid city name.');
    }
});

/* 
// For production build
app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/

app.listen(5000);