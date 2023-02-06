const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UsersModal = require('../Modal/UserModal.js')

const router = express.Router();



 
router.post('/register', async (req, res)=>{

    const saltRounds = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword
    const newUser = new UsersModal(req.body);
    const {username} = req.body

    try {
        const existingUser = await UsersModal.findOne({username})
        if (existingUser) {
            res.status(404).json('You are an existing username')
        } else {
            const user =  await newUser.save() 
            const token = jwt.sign({
                username: user.username,
                id: user._id
            }, process.env.JWT_KEY, {expiresIn: '1h'})
            res.status(200).json({user, token})
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
    
});

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    try {

    const user = await UsersModal.findOne({username: username});

    if (user) {
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            res.status(404).json('password is incorrect')
        } else{
            const token = jwt.sign({
                username: user.username,
                id: user._id
            }, process.env.JWT_KEY, {expiresIn: '1h'})
            res.status(200).json({user, token})
        }
    } else {
        res.status(404).json('user does not exist')
    }

} catch (err) {
    console.log(err)
}
})

module.exports = router