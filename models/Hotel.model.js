const mongoose = require('mongoose')
const hotelSchema = mongoose.Schema({
    hotel_name:{type:String, required:true},
    location :{type:String, required:true},
    rating:{type:Number, required:true},
    serve_food:{type:Boolean, required:true},
})


const HotelModel = mongoose.model('hotel', hotelSchema)

module.exports = {HotelModel}