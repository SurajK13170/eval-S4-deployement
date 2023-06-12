const express = require("express")
const {connection} = require('./db')
const {OwnerRouter} = require('./routes/Owner.route')
const {hotelRouter} = require('./routes/Hotel.route')
const swagggerUi = require('swagger-ui-express')
const swaggerJSdoc = require('swagger-jsdoc')
require("dotenv").config()
const port = process.env.port
const app = express()

app.use(express.json())
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Hotel Management",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http//localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
}

app.use('/Owners',OwnerRouter)
app.use('/hotel',hotelRouter)

app.listen(port,async ()=>{
try{
    connection
    console.log("connected to Data Base")
}catch(err){
    console.log('not connected')
}
console.log(`Server is running at Port ${port}`)
})