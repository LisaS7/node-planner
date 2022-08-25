const express = require('express');
const app = express();

// Functions
const {calendar} = require('./controllers.js');

// Config
const PORT = 5000;
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', calendar)

app.all('*', (req, res) => {
    res.status(404).send('resource not found!');
})

app.listen(PORT, () => {
    console.log('server running');
})