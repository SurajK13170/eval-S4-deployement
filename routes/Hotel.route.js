const {HotelModel} = require('../models/Hotel.model')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {auth} = require('../middelWare/auth')
const rateLimit = require('express-rate-limit')

const hotelRouter = express.Router()

const limiter = rateLimit({
    windowMs:60*1000,
    max:10,
    message: 'Max Request Limit Has Been Exceeded'
})

hotelRouter.get('/',limiter,auth, async (req, res) => {
    try {
        const hotels = await HotelModel.find();
        res.status(200).json(hotels);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  });
  
  hotelRouter.post('/add',limiter,auth, async (req, res) => {
    try {
      const hotel = new HotelModel(req.body);
      await hotel.save();
      res.status(200).json({ msg: 'New Hotel Added' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  hotelRouter.get('/:id', limiter,auth,async (req, res) => {
    const { id } = req.params;
    try {
      const hotel = await HotelModel.findById(id);
      if (!hotel) {
        res.status(404).json({ error: 'Hotel Not Found' });
      } else {
        res.status(200).json(hotel);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  hotelRouter.patch('/update/:id',limiter,auth, async (req, res) => {
    const { id } = req.params;
    try {
      const hotel = await HotelModel.findByIdAndUpdate(id, req.body);
      if (!hotel) {
        res.status(404).json({ error: 'Hotel Not Found' });
      } else {
        res.status(200).json({ msg: 'Hotel Update Successful' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  hotelRouter.delete('/del/:id',limiter,auth, async (req, res) => {
    const { id } = req.params;
    try {
      const hotel = await HotelModel.findByIdAndDelete(id);
      if (!hotel) {
        res.status(404).json({ error: 'Hotel Not Found' });
      } else {
        res.status(200).json({ msg: 'Hotel Deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = {hotelRouter}