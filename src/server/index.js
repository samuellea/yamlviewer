const express = require('express');
const axios = require('axios');
const YAML = require('yamljs');

const app = express();

app.use(express.static('dist'));

app.get('/api/fetch', (req, res) => {

  const { url } = req.query;

  if (!url) return res.status(400).send('No URL entered.');
  if (!url.startsWith('https://github.com')) return res.status(400).send(`Provided URL must begin 'https://github.com'`);
  if (!url.includes('/blob/')) return res.status(400).send('Provided URL must be a github blob.');
  if (!url.endsWith('.yaml')) return (res.status(400)).send('Provided file must have .yaml extension');

  const request = axios.create({ baseURL: 'https://raw.githubusercontent.com/' });

  const deBlobbed = `${url.slice(19).replace('/blob/', '/')}`;

  return request.get(deBlobbed).then(({ data }) => {
    var obj = YAML.parse(data);
    var jsonStr = JSON.stringify(obj);
    let converted = JSON.parse(jsonStr)
    return res.send(converted);
  }).catch(err => { res.sendStatus(err.response.status) })

});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
