var express = require('express');
var app = express();
var database = require('../config/database');
const jwt = require("jsonwebtoken");


app.post('/api/login/',(req,res) => {
   
    const {name,password}=req.body;
    console.log(name,password)
    let sql = `SELECT name,type,class_id FROM users WHERE name = '${name}' AND password = '${password}'`;

    database.query(sql,(err, result)=>{
        if (err){
            res.status(400).send(err);
            return;
        }
        console.log()
        if (result.length){
            const token=jwt.sign({
                ...result[0],
            },"mysecret",{expiresIn:'12h'});

            res.json({
                jwt:token
            });
        } 
        else res.json({
            message: "Wrong username or password!"
        });
    });
});


module.exports = app;
