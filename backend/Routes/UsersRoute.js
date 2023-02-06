const express = require('express');
const UsersModal = require('../Modal/UserModal.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../MiddleWare/authMiddleWare.js');


const router = express.Router();


// get all user
router.get('/', async(req, res)=>{
    try {
        let users = await UsersModal.find()
        users = users.map((user)=>{
            const {password, ...otherDetails} = user._doc
            return otherDetails
        })
            res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }

    
})

// get a user
router.get('/:id', async(req, res)=>{
    const id = req.params.id;

    try {
        const user = await UsersModal.findById(id)

        if (user) {
            const {password, ...others} = user._doc
            res.status(200).json(others)
        } else {
            res.status(404).json('No user of such')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//update a user
router.put('/:id', authMiddleWare, async(req, res)=>{
    const id = req.params.id;
    const {_id, adminStatus, password} = req.body;

        if (_id===id) {

            try {
                
                
                if(password) {
                    const saltRounds = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(password, saltRounds);
                } 

                const user = await UsersModal.findByIdAndUpdate(id, req.body, {new: true})
                const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_KEY, {expiresIn: '1h' } )
                res.status(200).json({user, token})

            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(403).json('access denied! you can only update your account')
        }
    
})


// delete a user
router.delete('/:id', authMiddleWare, async(req, res)=>{
    const id = req.params.id;
    const {currentId, adminStatus} = req.body;
    if (currentId===id || adminStatus) {
        try {
            await UsersModal.findByIdAndDelete(id)
            res.status(200).json('user deleted')
        } catch (error) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('access denied! you can only delete your account')
    }
})

// follow a user
router.put('/:id/follow', authMiddleWare, async(req, res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if (_id === id) {
        res.status(403).json('you cannot follow yourself')
    } else {
        try {
            const followUser = await UsersModal.findById(id)
            const followingUser = await UsersModal.findById(_id)
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: {followers: _id}})
                await followingUser.updateOne({ $push: {following: id}})
                res.status(200).json('User followed')
            } else {
                res.status(403).json('action forbidden, user is follow by you')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

// unfollow a user
router.put('/:id/unfollow', authMiddleWare, async(req, res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if (_id === id) {
        res.status(403).json('you cannot follow yourself')
    } else {
        try {
            const followUser = await UsersModal.findById(id)
            const followingUser = await UsersModal.findById(_id)
            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: {followers: _id}})
                await followingUser.updateOne({ $pull: {following: id}})
                res.status(200).json('User unfollowed')
            } else {
                res.status(403).json('user is not followed by you')
            }
        } catch (error) {
            res.status(500).json(err)
        }
    }
})

module.exports = router