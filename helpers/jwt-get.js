const jwt = require("jsonwebtoken");

module.exports=(request,response,next)=>{
    const token=request.headers['authorization'];
    console.log(token);
    if (typeof token !== 'string') {
        response.send({
            status:false,
            message:"Unauthorized"
        });
        return;
    }
    const tokenArr=token.split(" ");
    if(tokenArr[0]!=="Bearer"){
        response.send({
            status:false,
            message:"Unauthorized"
        });
        return;
    }
    jwt.verify(tokenArr[1],"mysecret",(error,data)=>{
        if(!error){
            request.user=data;
            next();
        }else{
            response.send({
                status:false,
                message:"Unauthorized"
            });
        }
    })    
}