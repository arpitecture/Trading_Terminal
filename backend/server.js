require('dotenv').config()
const app=require('./src/app.js')
const { startPriceSimulator } = require('./src/services/PriceSimulator.js')

startPriceSimulator()

app.listen(3000,()=>{
    console.log("server running at port 3000")
})