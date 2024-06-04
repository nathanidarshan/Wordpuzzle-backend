const usermodel = require('../model/usermodel');
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */ );

exports.get_data = async(req,res) =>{
    var data = await usermodel.find();
   
    res.status(200).json({
        data
    })
}



exports.insert = async (req,res)=>{

    var b_data = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_data;

    var data = await usermodel.create(req.body);
    res.status(200).json({
        data
    })
}

var logginin =false;

exports.login=async (req,res) =>{
    var data = await usermodel.find({"email":req.body.email});
    var login_data = await storage.getItem('user_id');
    
if(login_data == undefined)
    {
        if(data.length == 1){
    
        bcrypt.compare(req.body.password,data[0].password ,async function(err, result) {
            
            if(result == true)
                    {   
                       
                        await storage.setItem("user_id",data[0].id)
                        logginin = true;
                        res.status(200).json({
            
                            status:"login",
                           
                         }) 
                    
                    }  
                   
                    else
                    {
                        res.status(200).json({
            
                            status:"check your email and password"
                         }) 
                    }
                
                })
            }
    else{
    
        res.status(200).json({
            
            status:"check your email and password"
         }) 
        }
        
    }else{
        res.status(200).json({
            status:"user is allready login"
        })
    }
    
    
    }

    exports.logout = async (req,res) =>{
        await storage.clear()
        res.status(200).json({
            status:" user Logout"
        })
    }