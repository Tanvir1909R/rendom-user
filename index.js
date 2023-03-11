const express = require("express")
const cors = require('cors')
const app = express()
const userRoute = require('./routes/userRoute')


app.use(cors())
app.use(express.json())
app.use('/user',userRoute)


app.get('/',(req,res)=>{
    res.send('hello. welcome to the server')
})


app.listen(7000,()=>{
    console.log('server is ready');
})

