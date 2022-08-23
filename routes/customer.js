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
        var tableQuery="CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY,name VARCHAR(255),address VARCHAR(255),mobileno VARCHAR(255))"
        connection.query(tableQuery,function (err,result){
            if (err)throw  err;
            if (result.warningCount ==0){
                console.log("Customer Table Created!");
            }
        })

    }
})

router.post('/',(req,res) =>{
    const id =req.body.id
    const name=req.body.name
    const address=req.body.address
    const mobileno=req.body.mobileno

    var query="INSERT INTO customer (id,name ,address,mobileno) VALUES (?, ?, ?, ?)"
    connection.query(query,[id,name,address,mobileno],(err) =>{
        if (err){
            res.send({'message' : 'Duplicate entry'})
        }else {
            res.send({'message' : 'Customer Saved!'})
        }
    })
})

router.get('/',(req,res) =>{
    var query ="SELECT * FROM customer"
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})

router.put('/',(req,res)=>{
    const id =req.body.id
    const name=req.body.name
    const address=req.body.address
    const mobileno=req.body.mobileno

    var query ="UPDATE customer SET name=?, address=?, mobileno=? WHERE id=?"
    connection.query(query,[name,address,mobileno,id],(err,rows)=>{
        if (err)throw err;
        if (rows.affectedRows > 0){
            res.send({'message ': 'Customer Updated!' })
        }else{
            res.send({'message ': 'Customer not found' })
        }
    })
})

module.exports=router