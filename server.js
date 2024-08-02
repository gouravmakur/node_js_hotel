const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 



app.get('/', function (req, res) {
  res.send('Welcome To Chinse Inn')
})

const personRoutes = require('./Routes/personRoutes');
app.use('/person' , personRoutes);

const menuRoute = require('./Routes/menuRoutes');
app.use('/menu', menuRoute);


app.listen(3000, ()=>{
    console.log('server is active');
});