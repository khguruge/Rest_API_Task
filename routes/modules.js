var express = require('express');
var app = express();
var database = require('../config/database');
var moment = require('moment');
var authGuard = require('../helpers/jwt-get');


app.get('/',authGuard,(req, res) => {
    if(req.user.type==="Instructor" || req.user.type==="Admin"){
        res.json({
            data:["IMAGE_PROCESSING","VOICE_REC", "FACE_DETECT"]
        });

    }else{
        console.log(req.user)
        let sql = `select name from  class_module WHERE class_id = ${req.user.class_id}`;

        database.query(sql , async(err, result) => {
            if(err){
                res.status(400).json({
                    message : err
                });
                return;
            }
            let data=[];
            for(let i of result){
                data.push(i.name)
            }
            res.json({
                data
            });
        })
    }
    
});

app.get('/:module',authGuard,(req, res) => {
    if(req.user.type==="Instructor" || req.user.type==="Admin"){
        res.json({
            data:`Hello Module ${req.params.module}`
        });

    }else{
        console.log(req.user)
        let sql = `select name from  class_module WHERE class_id = ${req.user.class_id} and name = '${req.params.module}'`;

        database.query(sql , async(err, result) => {
            if(err){
                res.status(400).json({
                    message : err
                });
                return;
            }
            if(result.length>0){
                res.json({
                    data:`Hello Module ${req.params.module}`
                });
                return;
            }else{
                res.send({
                    status:false,
                    message:"Unauthorized"
                });
            }
            
        })
    }
    
});



module.exports = app;
