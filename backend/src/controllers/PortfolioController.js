const instruments = require('../data/instruments.json')
const {getPortfoliowithPnL}=require('../services/PortfolioService')

const fetchPortfolio = (req,res)=>{
    const portfolio = getPortfoliowithPnL(instruments)
    res.json(portfolio)
}

module.exports={fetchPortfolio}