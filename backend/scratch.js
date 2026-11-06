const {getPortfolio,applyBuy,applySell,applyFill,getPortfolioWithPnl} = require('./src/services/PortfolioService')

applyBuy('TCS', 10, 100)
applyBuy('TCS', 10, 120)
console.log(getPortfolio())
applyFill({ side: 'BUY', symbol: 'TCS', quantity: 10 }, 100)
console.log(getPortfolioWithPnl([{ symbol: 'TCS', price: 130 }]))
try {
  applyBuy('TCS', 1000000, 100)
} catch (e) {
  console.log('Refused:', e.message)
}
console.log(getPortfolio())