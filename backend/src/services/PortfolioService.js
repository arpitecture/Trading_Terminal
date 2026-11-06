const portfolio={
    cash:100000,
    holdings:{},
    realizedPnL:0
}
const getPortfolio=()=>{
    return portfolio;
}
const applyBuy=(symbol,quantity,price)=>{
    const cost = quantity * price
    const holding = portfolio.holdings[symbol]

    if(portfolio.cash<price*quantity){
        throw new Error('Insufficient cash');
    }

    if(symbol in portfolio.holdings){
        const newQty = holding.quantity + quantity
        holding.avgPrice = Math.round(((holding.quantity * holding.avgPrice + cost) / newQty) * 100)/100
        holding.quantity = newQty;
    }else{
        portfolio.holdings[symbol]={symbol:symbol,quantity:quantity,avgPrice:price};
    }

    portfolio.cash-=quantity*price;
    
}
const applySell=(symbol,quantity,price)=>{
    const holding=portfolio.holdings[symbol];
    if(holding && holding.quantity>=quantity){
        const pnl = (price - holding.avgPrice) * quantity
        portfolio.cash = Math.round((portfolio.cash + quantity*price) * 100) / 100
        portfolio.realizedPnL = Math.round((portfolio.realizedPnL + pnl) * 100) / 100
        
        holding.quantity-=quantity;
        
        if(holding.quantity===0){
            delete portfolio.holdings[symbol]
        }
    }else{
        throw new Error("you dont hold the stock or enough quantities")
    }
}
const applyFill=(order, price)=>{
    if(order.side==='BUY'){
        applyBuy(order.symbol, order.quantity, price)
    }else if(order.side==='SELL'){
        applySell(order.symbol, order.quantity, price)
    }
}
const getPortfoliowithPnL = (instruments) => {
  const round = (n) => Math.round(n * 100) / 100

  const holdings = Object.entries(portfolio.holdings).map(([symbol, h]) => {
    const stock = instruments.find(i => i.symbol === symbol)
    const currentPrice = stock ? stock.price : h.avgPrice

    return {
      symbol,
      quantity: h.quantity,
      avgPrice: h.avgPrice,
      currentPrice,
      marketValue: round(h.quantity * currentPrice),
      unrealizedPnl: round((currentPrice - h.avgPrice) * h.quantity)
    }
  })

  const totalMarketValue = round(holdings.reduce((sum, h) => sum + h.marketValue, 0))
  const totalUnrealizedPnl = round(holdings.reduce((sum, h) => sum + h.unrealizedPnl, 0))

  return {
    cash: portfolio.cash,
    realizedPnL: portfolio.realizedPnL,
    holdings,
    totalMarketValue,
    totalUnrealizedPnl,
    totalEquity: round(portfolio.cash + totalMarketValue)
  }
}
module.exports={getPortfolio,applyBuy,applySell,applyFill,getPortfoliowithPnL};