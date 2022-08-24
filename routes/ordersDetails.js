const express =require('express')
const router =express.Router()
const app =express()

const mysql=require('mysql')
const db=require('../configs/db.configs')
const connection =mysql.createConnection(db.database)

connection.connect(function (err){
    if (err){
        console.log(err)
    }else {
        console.log('connected to the mysql server')
        var tableQuery="CREATE TABLE IF NOT EXISTS order_details (order_id VARCHAR(255) PRIMARY KEY, item_id VARCHAR(255), qty INT)"
        connection.query(tableQuery,function (err,result){
            if (err)throw err;
            if (result.warningCount ==0){
                console.log("order_details Table Created!");
            }
        })
    }
})

router.post('/',(req,res) =>{
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;
    const qty = req.body.qty;

    var query="INSERT INTO order_details (order_id,item_id ,qty) VALUES (?, ?, ?)"
    connection.query(query,[order_id,item_id,qty],(err) =>{
        if (err){
            res.send({'message' : 'Duplicate entry'})
        }else {
            res.send({'message' : 'Order_details Saved!'})
        }
    })
})

router.get('/',(req,res) =>{
    var query ="SELECT * FROM order_details"
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})

router.put('/',(req,res)=>{
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;
    const qty = req.body.qty;

    var query ="UPDATE order_details SET item_id=?, qty=? WHERE order_id=?"
    connection.query(query,[item_id,qty,order_id],(err,rows)=>{
        if (err)throw err;
        if (rows.affectedRows > 0){
            res.send({'message ': 'Order_details Updated!' })
        }else{
            res.send({'message ': 'Order_details not found' })
        }
    })
})


module.exports=router