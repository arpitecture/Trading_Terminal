const { getPortfolio, applyBuy } = require('./src/services/PortfolioService')

applyBuy('TCS', 10, 100)
applyBuy('TCS', 10, 120)
console.log(getPortfolio())

try {
  applyBuy('TCS', 1000000, 100)
} catch (e) {
  console.log('Refused:', e.message)
}
console.log(getPortfolio())