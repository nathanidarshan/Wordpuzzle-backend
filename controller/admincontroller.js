const adminmodel = require('../model/adminmodel');
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */ );

exports.admin_get_data = async(req,res) =>{
    var data = await adminmodel.find();
   
    
    res.status(200).json({

        data
    })
}



exports.admin_insert = async (req,res)=>{

    var b_data = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_data;

    var data = await adminmodel.create(req.body);
    res.status(200).json({
        data
    })
}

var logginin =false;

exports.admin_login=async (req,res) =>{
    var data = await adminmodel.find({"email":req.body.email});
    var login_data = await storage.getItem('admin_id');


    
if(login_data == undefined)
    {
        if(data.length == 1){
    
        bcrypt.compare(req.body.password,data[0].password ,async function(err, result) {
            
            if(result == true)
                    {   
                       
                        await storage.setItem("admin_id",data[0].id)
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

    exports.admin_logout = async (req,res) =>{
        await storage.clear()
        res.status(200).json({
            status:" user Logout"
        })
    }