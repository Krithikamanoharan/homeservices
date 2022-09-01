const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ServiceBooking=require('../models/servicebooking');
JWT_SECRET = "kri123";


//methods that will use the model
exports.getServiceBookings=async(req,res)=>{
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        const email = decoded.email
        const servicebookings = await ServiceBooking.find().sort({createdAt:-1})
        console.log(servicebookings)
        
        return res.status(200).json({
            success:true,
            count:servicebookings.length,
            data:servicebookings

        });
    }catch(err){
        res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}

exports.addServiceBookings=async(req,res)=>{
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        const email = decoded.email 
        const {bookingid,servicename,city,duration,bookingstatus,serviceid,userid} = req.body;

        const service=await ServiceBooking.create(req.body);

        return res.status(201).json({
        suceess:true,
        data:service
    });
    }catch(err){
        if(err.name==='ValidationError'){
            const messages=Object.values(err.errors).map(val=>val.message);

            return res.status(400).json({
                success:false,
                error:messages
            });
        }
    }
    
}

exports.deleteServiceBookings=async(req,res)=>{
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        const email = decoded.email 
        const {bookingid,servicename,city,duration,bookingstatus,serviceid,userid} = req.body;
        const servicebooking=await ServiceBooking.findById(req.params.id);
        if(!servicebooking){
            return res.status(404).json({
                success:false,
                error:'No booking found with that id'
            });
        }
        await servicebooking.remove();

        return res.status(200).json({
            success:true,
            data:{}
        });
    }catch(err){
        res.status(500).json({
            success:false,
            error:'ServerError'
        });
    }
}