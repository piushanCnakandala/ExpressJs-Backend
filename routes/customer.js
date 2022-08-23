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
        var tableQuery="CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY,name VARCHAR(255),address VARCHAR(255),mobileNo VARCHAR(255))"
        connection.query(tableQuery,function (err,result){
            if (err)throw  err;
            if (result.warningCount ==0){
                console.log("Customer Table Created!");
            }
        })

    }
})


module.exports=router