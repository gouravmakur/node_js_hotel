const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const PORT  = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Welcome To Chinse Inn')
})

const personRoutes = require('./Routes/personRoutes');
app.use('/person' , personRoutes);

const menuRoute = require('./Routes/menuRoutes');
app.use('/menu', menuRoute);


app.listen(PORT, ()=>{
    console.log('server is active');
});