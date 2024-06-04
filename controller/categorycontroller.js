var category = require('../model/categorymodel');

exports.insert = async (req,res)=>{
    var data = await category.create(req.body);
    res.status(200).json({
        status:"data insert",
        data
    })
}

exports.get_data = async (req,res)=>{
    var data = await category.find();
    res.status(200).json({
        status:"data select",
        data
    })
}