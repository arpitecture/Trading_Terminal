const express = require('express');
const cors=require('cors')

const instrumentRoutes=require('./routes/InstrumentRoutes.js')
const orderRoutes=require('./routes/orderRoutes.js')
const portfolioRoutes = require('./routes/PortfolioRoutes.js')

const app=express()

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json())

app.get('/api/health',(req,res)=>{
    res.status(201).json({status:'ok'})
})
app.use('/api/instruments', instrumentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/portfolio',portfolioRoutes)

module.exports=app