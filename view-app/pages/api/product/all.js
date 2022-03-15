const fetch = require('node-fetch');

const apiUrl = 'http://localhost:8001';

export default async function handler (req, res) {
    try {
      const url = `${apiUrl}/v1/api/product/getAll`;

      const headers = { 'Content-Type': 'application/json' };
      const response = await fetch(url, { method: 'GET', headers });
      const resData = await response.json();
      console.log('resData', resData);
      res.status(200).json(resData)
    } catch (error) {
      console.log('error-----', error);
      res.status(200).json("error")
    }
}