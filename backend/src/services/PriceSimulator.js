const instruments=require("../data/instruments.json")

const tick=()=>{
    instruments.forEach(stock=>{
        stock.price = Math.round(stock.price * (1 + (Math.random() - 0.5) * 0.002) * 100) / 100
    })
    
}
const startPriceSimulator = ()=>{
    setInterval(tick, 1000);
}

module.exports={ startPriceSimulator }

