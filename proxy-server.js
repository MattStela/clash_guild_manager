const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Certifique-se de que esta linha está presente

const app = express();
const port = 4000;

app.use(cors());

app.get('/clashofclans/:clanTag/currentwar', async (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;  // Verifique se a variável está correta
  const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}/currentwar`;

  console.log(`Fetching current war data for Clan Tag: ${clanTag}`);
  console.log(`Using API Key: ${apiKey}`);
  console.log(`Request URL: ${url}`);

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
});
{/*==================================================================*/}
app.get('/clashofclans/:clanTag/warlog', async (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;  // Verifique se a variável está correta
  const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}/warlog?limit=10`;

  console.log(`Fetching war log data for Clan Tag: ${clanTag}`);
  console.log(`Using API Key: ${apiKey}`);
  console.log(`Request URL: ${url}`);

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
});
{/*==================================================================*/}
// Nova rota para buscar os membros do clã
app.get('/clashofclans/:clanTag/members', async (req, res) => {
  const clanTag = req.params.clanTag;
  const apiKey = process.env.CLASH_API_KEY;  // Verifique se a variável está correta
  const url = `https://api.clashofclans.com/v1/clans/%23${clanTag}/members`;

  console.log(`Fetching members data for Clan Tag: ${clanTag}`);
  console.log(`Using API Key: ${apiKey}`);
  console.log(`Request URL: ${url}`);

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
});
{/*==================================================================*/}
// Nova rota para buscar as informações dos jogadores
app.get('/clashofclans/players/:playerTag', async (req, res) => {
  const playerTag = req.params.playerTag;
  const apiKey = process.env.CLASH_API_KEY;  // Verifique se a variável está correta
  const url = `https://api.clashofclans.com/v1/players/%23${playerTag}`;

  console.log(`Fetching player data for Player Tag: ${playerTag}`);
  console.log(`Using API Key: ${apiKey}`);
  console.log(`Request URL: ${url}`);

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
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
