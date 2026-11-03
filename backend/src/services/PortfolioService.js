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

}
const getPortfolioWithPnl=(instruments)=>{
    
}
module.exports={getPortfolio,applyBuy,applySell};