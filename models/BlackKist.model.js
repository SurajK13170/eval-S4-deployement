const mongoose = require('mongoose')
const blackListSchema =  mongoose.Schema({
    token:{type:String}
})

const blackListModel = mongoose.model('blacklistToken', blackListSchema)

module.exports = {blackListModel}