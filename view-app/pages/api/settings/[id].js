// const fetch = require('node-fetch');

const fetch = require('node-fetch');

const apiUrl = 'http://localhost:8001';

export default async function handler ({ query: { id } }, res) {
    console.log("api call")
    const url = `${apiUrl}/v1/api/settings/getOneItem/${id}`;
    const headers = {
      'Content-Type': 'application/json'
    };
    const response = await fetch(url, { method: 'GET', headers });
    const resData = await response.json();
    
    res.status(200).json(resData)
}