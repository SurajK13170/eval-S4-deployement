const express = require('express')
const {OwnerModel} = require('../models/Owner.model')
const {blackListModel} = require('../models/BlackKist.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')

const OwnerRouter = express.Router()

OwnerRouter.post('/signup', async (req, res) => {
    const { email, password, owner_name, age, city, phone } = req.body;
    try {
      const existingOwner = await OwnerModel.findOne({ email });
      if (existingOwner) {
        return res.status(400).json({ error: 'Owner already exists!' });
      }
  
      bcrypt.hash(password, 10, async (err, hash) => {
        const owner = new OwnerModel({
          email,
          password: hash,
          owner_name,
          age,
          city,
          phone,
        });
        await owner.save();
        res.status(200).json({ msg: 'Registration successful!' });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  OwnerRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const owner = await OwnerModel.findOne({ email });
      if (!owner) {
        return res.status(404).json({ error: 'User not found!' });
      }
  
      bcrypt.compare(password, owner.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ email: owner.email }, 'masai', {
            expiresIn: '7d',
          });
          res.status(200).json({ msg: 'Login successful!', token });
        } else {
          res.status(401).json({ error: 'Invalid password!' });
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  OwnerRouter.post('/logout', async(req, res)=>{
    const {token} = req.body
    try{
        const blackListToken = new blackListModel({token})
        await blackListToken.save()
        res.status(200).json({msg:'Logout Successfull!!'})
    }catch(err){
        res.status(500).json({err:err.message})
    }
  })
module.exports = {OwnerRouter}