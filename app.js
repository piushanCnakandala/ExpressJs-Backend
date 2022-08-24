const express = require('express')
const app = express()
const port = 4000
const customer=require('./routes/customer')
const item =require('./routes/item')
const order=require('./routes/order')
const orderDetails=require('./routes/ordersDetails')

app.use(express.json());   //if we use json object inside our app.js
app.use('/customer',customer)
app.use('/item',item)
app.use('/order',order)
app.use('/details',orderDetails)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})