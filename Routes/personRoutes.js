const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtTokenMiddleware, genrateToken} = require('../jwt');

// POST route to create a new person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        // Create a new person document using the mongoose model
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data saved');

        const payload = {
            id : response.id,
            username : response.username
        }

        const token = genrateToken(payload);
        console.log("Token is " , token);

        res.status(201).json({response:response , token : token});  // Use 201 status code for created resources

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });  // Return error message
    }
});


//LogIn route

router.post('/login', async (req , res) =>{

    try {
        
        //extract info
        const {username , password} = req.body;

        //find in databas
        const user = await Person.findOne({username : username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error : 'Invalid username or password'});
        }

        const payload = {
            id : user.id,
            username : user.username
        }

        const token = genrateToken(payload);

        res.json({token});

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ error: error.message });
    }

});

router.get('/profile', jwtTokenMiddleware, async(req,res) =>{

    try {
        
        const userData = req.user;
        const userId = userData.id;

        const user = await Person.findById(userId);

        res.status(200).json({user});

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch all persons
router.get('/', jwtTokenMiddleware ,async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch persons by workType
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;

        // Validate workType
        if (['Chef', 'Manager', 'Waiter'].includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Data fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid workType' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id' , async (req , res) =>{

  try {

    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId , updatePersonData , { new: true });
    
    if(!response){
      return res.status(404).json({error : 'Person not Found'});
    }

    console.log("Data Updated");
    res.status(200).json(response);
    
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }

});

router.delete('/:id' , async(req,res)=>{

    try {
      
      const personId = req.params.id;
      const response = await Person.findByIdAndDelete(personId);

      if(!response){
        return res.status(404).json({error : 'Person not Found'});
      }

      console.log('Data delted');
      res.status(200).json({message : 'Person Data removed Sucessfully'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;