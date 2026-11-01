const express=require('express')
const router=express.Router()
const { getAllInstruments } = require('../controllers/InstrumentController.js')

router.get('/', getAllInstruments)

module.exports = router