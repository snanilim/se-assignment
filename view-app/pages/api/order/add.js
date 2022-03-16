const fetch = require('node-fetch');

const apiUrl = 'http://localhost:8001';

export default async function handler (req, res) {
    const { body: data } = req;
    const { id } = req.query;
    try {
      const url = `${apiUrl}/v1/api/order/add`;
      const body = JSON.stringify(data);
      const headers = { 'Content-Type': 'application/json' };
      const response = await fetch(url, { method: 'POST', body, headers });
      const resData = await response.json();
      console.log('resData', resData);
      res.status(200).json(resData)
    } catch (error) {
      console.log('error-----', error);
      res.status(200).json("error")
    }
}