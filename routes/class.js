var express = require('express');
var app = express();
var database = require('../config/database');
var authGuard = require('../helpers/jwt-get');


app.post('/',authGuard,(req, res) => {
    if(req.user.type==="Instructor"){
        let sql = `INSERT INTO class (name) VALUES ('${req.body.name}')`;

        database.query(sql , async(err, result) => {
            if(err){
                res.status(400).json({
                    message : err
                });
                return;
            }
            const classId=result.insertId;
            let sql="INSERT INTO class_module(name,class_id) VALUES";
            for(let i in req.body.modules){
                if(i==req.body.modules.length-1)
                    sql = sql+` ("${req.body.modules[i]}",${classId})`;
                else
                    sql = sql+` ("${req.body.modules[i]}",${classId}),`;

            }
            await database.query(sql,(err,result)=>{
               
            })

            sql="INSERT INTO users(name,password,type,class_id) VALUES";
            let users=[];
            for(let i in req.body.students){

                const password=Math.ceil((Math.random()*1000+1001)).toString() 
                users.push({
                    name:req.body.students[i],
                    password
                }) 
                if(i==req.body.students.length-1)
                    sql = sql+` ("${req.body.students[i]}","${password}","Student",${classId})`;
                else
                    sql = sql+` ("${req.body.students[i]}","${password}","Student",${classId}),`;
            }
            await database.query(sql,(err,result)=>{
               
            })
            res.status(200).json({
                status:200,
                students:users,
                success: true,
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
