const express = require('express');
const path = require('path');
const config = require('./config.json');
const app = express();

const PORT = 5000;

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send('resource not found!')
})

app.listen(PORT, () => {
    console.log('server running')
})