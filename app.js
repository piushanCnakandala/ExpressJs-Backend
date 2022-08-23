const express = require('express')
const app = express()
const port = 4000
const customer=require('./routes/customer')
const item =require('./routes/item')

app.use(express.json());   //if we use json object inside our app.js
app.use('/customer',customer)
app.use('/item',item)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})