const express=require('express')
const router=express.Router()
const { fetchPortfolio } = require('../controllers/PortfolioController')

router.get('/',fetchPortfolio)

module.exports=router