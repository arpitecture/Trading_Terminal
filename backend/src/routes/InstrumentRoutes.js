const express=require('express')
const router=express.Router()
const { getAllInstruments,getInstrumentBySymbol } = require('../controllers/InstrumentController.js')

router.get('/', getAllInstruments)
router.get('/:symbol', getInstrumentBySymbol)

module.exports = router