var express = require('express');
var app = express();
var database = require('../config/database');
var authGuard = require('../helpers/jwt-get');


app.post('/',authGuard,(req, res) => {

    if(req.user.type==="Admin"){
        const password=Math.ceil((Math.random()*1000+1001)).toString()  

        let sql = `INSERT INTO users (name, password,type) VALUES ('${req.body.name}','${password}','Instructor')`;
        console.log(req.body.name)
        database.query(sql , (err, result) => {
            console.log(result);
            if(err){
                res.status(400).json({
                    message : err
                });
                return;
            }
            //If no error
            res.status(200).json({
                status:200,
                success: true,
                password
            })
        });
    }else{
        res.send({
            status:false,
            message:"Unauthorized"
        });
    }
    
});




module.exports = app;
