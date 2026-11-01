const instruments=require('../data/instruments.json')

const getAllInstruments=async (req,res)=>{
    res.json(instruments)
}
const getInstrumentBySymbol=async (req,res)=>{
    const symbol=req.params.symbol
    const found=instruments.find(stock=>stock.symbol.toUpperCase() === symbol.toUpperCase())
    if(found){
        res.status(200).json({
            found
        })
    }else{
        res.status(404).json({
            error:"not found"
        })
    }
}
module.exports={getAllInstruments,getInstrumentBySymbol}