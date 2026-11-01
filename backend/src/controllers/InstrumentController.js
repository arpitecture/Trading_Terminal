const instruments=require('../data/instruments.json')

const getAllInstruments=async (req,res)=>{
    res.json(instruments)
}
module.exports={getAllInstruments}