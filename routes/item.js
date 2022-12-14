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
        var tableQuery="CREATE TABLE IF NOT EXISTS item (id VARCHAR(255) PRIMARY KEY,name VARCHAR(255),qty INT, price DOUBLE )"
        connection.query(tableQuery,function (err,result){
            if (err)throw  err;
            if (result.warningCount ==0){
                console.log("Item Table Created!");
            }
        })

    }
})

router.post('/',(req,res) =>{
    const id =req.body.id
    const name=req.body.name
    const qty=req.body.qty
    const price=req.body.price

    var query="INSERT INTO item (id,name ,qty,price) VALUES (?, ?, ?, ?)"
    connection.query(query,[id,name,qty,price],(err) =>{
        if (err){
            res.send({'message' : 'Duplicate entry'})
        }else {
            res.send({'message' : 'Item Saved!'})
        }
    })
})

router.get('/',(req,res) =>{
    var query ="SELECT * FROM item"
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})

router.put('/',(req,res)=>{
    const id =req.body.id
    const name=req.body.name
    const qty=req.body.qty
    const price=req.body.price

    var query ="UPDATE item SET name=?, qty=?, price=? WHERE id=?"
    connection.query(query,[name,qty,price,id],(err,rows)=>{
        if (err)throw err;
        if (rows.affectedRows > 0){
            res.send({'message ': 'Item Updated!' })
        }else{
            res.send({'message ': 'Item not found' })
        }
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id

    var query= "DELETE FROM item WHERE id =?";
    connection.query(query,[id],(err,rows) =>{
        if (err)throw err;
        if (rows.affectedRows > 0){
            res.send({'message ' : 'Item deleted!'})
        }else{
            res.send({'message ' : 'Item not found'})
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id

    var query ='SELECT * FROM item WHERE id=?';
    connection.query(query,[id],(err,rows) =>{
        if(err)throw err;
        res.send(rows)
    })
})

module.exports=router