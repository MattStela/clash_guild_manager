const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());

const fetchData = async (url, apiKey, res) => {
  console.log(`Fetching data from URL: ${url}`);
  console.log(`Using API Key: ${apiKey}`);

  if (!apiKey) {
    console.error('API Key not found!');
    return res.status(500).send('API Key not found!');
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    console.log('Response received:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      console.error('Error data:', error.response.data);
    }
    res.status(500).send(error.response ? error.response.data : error.message);
  }
};

app.get('/clashofclans/:clanTag/currentwar', (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;
  const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}/currentwar`;
  fetchData(url, apiKey, res);
});

app.get('/clashofclans/:clanTag/warlog', (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;
  const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}/warlog?limit=10`;
  fetchData(url, apiKey, res);
});

app.get('/clashofclans/:clanTag/members', (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;
  const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}/members`;
  fetchData(url, apiKey, res);
});

app.get('/clashofclans/players/:playerTag', (req, res) => {
  const playerTag = req.params.playerTag;
  const apiKey = process.env.CLASH_API_KEY;
  const url = `https://api.clashofclans.com/v1/players/%23${playerTag}`;
  fetchData(url, apiKey, res);
});

app.get('/clashofclans/:clanTag/capitalraidseasons', (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;
  const limit = req.query.limit || 1;
  const url = `https://api.clashofclans.com/v1/clans/${clanTag}/capitalraidseasons?limit=${limit}`;
  fetchData(url, apiKey, res);
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
