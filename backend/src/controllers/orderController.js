const instruments = require('../data/instruments.json')

const orders=[]
let nextid=1;

const placeOrder =(req,res)=>{
    const {symbol ,side , quantity } =req.body
    if(typeof symbol!=='string'){
        return res.status(400).json({error:'Symbol is required'})
    }

    const stock=instruments.find(
        s=>s.symbol.toUpperCase()===symbol.toUpperCase()
    )
    if(!stock){
        return res.status(404).json({error:'Instrument not found' })
    }

    if(side!=='BUY' && side!=='SELL'){
        return res.status(400).json({error:'Side must be BUY or SELL'})
    }

    if(!Number.isInteger(quantity) || quantity<=0){
        return res.status(400).json({error:'Quantity must be a positive integer'})
    }
    const order={
        id:nextid++,
        symbol: symbol.toUpperCase(),
        side,
        quantity,
        status:"placed",
        createdAt: new Date().toISOString()
    }
    orders.push(order);
    res.status(201).json({
        message:"order created successfully",
        order
    })
}
const getOrders=(req,res)=>{
    res.status(201).json({
        orders
    })
}
module.exports = { placeOrder, getOrders }