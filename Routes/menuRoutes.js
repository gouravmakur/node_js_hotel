const express = require('express');

const router = express.Router();
const MenuItem = require('../models/menuItem');

router.get('/', async function (req, res) {
    
    try {
        
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
      res.status(500).json({ error: error.message });
    }
});

router.post('/', async(req, res)=>{

    try {
  
      const data = req.body;
      const newItem = new MenuItem(data);
  
      const response = await newItem.save();
      console.log('MenuItem Data saved');
      res.status(201).json(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;