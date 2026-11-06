const instruments = require('../data/instruments.json')
const { applyFill } = require('../services/PortfolioService')

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
    const order = {
        id: nextid++,
        userId: 1,
        symbol: stock.symbol,
        side,
        quantity,
        status: 'PENDING',
        createdAt: new Date().toISOString()
    }

    try {
        applyFill(order, stock.price)
        order.status = 'FILLED'
        order.fillPrice = stock.price
        orders.push(order)
        return res.status(201).json({ message: 'order filled', order })
    } catch (err) {
        order.status = 'REJECTED'
        order.reason = err.message
        orders.push(order)
        return res.status(400).json({ error: err.message, order })
    }
}
const getOrders=(req,res)=>{
    res.status(201).json({
        orders
    })
}
module.exports = { placeOrder, getOrders }