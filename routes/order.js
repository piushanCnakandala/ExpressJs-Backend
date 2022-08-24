const express =require('express')
const router =express.Router()
const app =express()
const mysql=require('mysql')
const db=require('../configs/db.configs')
const connection =mysql.createConnection(db.database)

connection.connect(function (err){
    if (err){
        console.log(err)
    }else{
        console.log('connected to the mysql server')
        var tableQuery="CREATE TABLE IF NOT EXISTS orders (id VARCHAR(255) PRIMARY KEY ,date VARCHAR(255),customer_id VARCHAR(255))";
        connection.query(tableQuery,function (err,result){
            if (err)throw err;
            if (result.warningCount ==0){
                console.log("Order Table Created!");
            }
        })
    }
})

router.post('/',(req,res) =>{
    const id =req.body.id
    const date=req.body.date
    const customer_id=req.body.customer_id

    var query="INSERT INTO orders (id,date ,customer_id) VALUES (?, ?, ?)"
    connection.query(query,[id,date,customer_id],(err) =>{
        if (err){
            res.send({'message' : 'Duplicate entry'})
        }else {
            res.send({'message' : 'Order Saved!'})
        }
    })
})

router.get('/',(req,res) =>{
    var query ="SELECT * FROM orders"
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})

router.put('/',(req,res)=>{
    const id =req.body.id
    const date=req.body.date
    const customer_id=req.body.customer_id

    var query ="UPDATE orders SET date=?, customer_id=? WHERE id=?"
    connection.query(query,[date,customer_id,id],(err,rows)=>{
        if (err)throw err;
        if (rows.affectedRows > 0){
            res.send({'message ': 'Order Updated!' })
        }else{
            res.send({'message ': 'Order not found' })
        }
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id

    var query= "DELETE FROM orders WHERE id =?";
    connection.query(query,[id],(err,rows) =>{
        if (err)throw err;
        if (rows.affectedRows > 0){
            res.send({'message ' : 'Order deleted!'})
        }else{
            res.send({'message ' : 'Order not found'})
        }
    })
})

module.exports=router