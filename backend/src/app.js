const express = require('express');
const cors=require('cors')
const instrumentRoutes=require('./routes/InstrumentRoutes.js')
const app=express()

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json())

app.get('/api/health',(req,res)=>{
    res.status(201).json({status:'ok'})
})
app.use('/api/instruments', instrumentRoutes)

module.exports=app