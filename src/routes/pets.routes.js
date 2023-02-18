const { Router } = require('express');
const router = Router();
const pets = require ('../code/pets.json')
const { v4: uuid } = require('uuid');

router.get('/', (req, res)=>{
    res.json({
        success: true,
        data: pets
    })
})
router.post('/', (req, res)=>{
    const pet = {
        id: uuid(),
        ...req.body
    };
    pets.push(pet)
    res.status(201).json({
        success: true,
        data: pets
    })
})
module.exports = router;