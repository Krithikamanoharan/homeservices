const mongoose=require('mongoose');

const ServiceBookingSchema=new mongoose.Schema({
    bookingid:{
        type:Number,
        unique:true
    },
    servicename:{
        type:String,
        trim:true,
        required:[true,'Add the service name']
    },
    city:{
        type:String,
        required:[true,'Add city name']
    },
    duration:{
        type:Number,
        required:[true,"Add duration in hours"]
    },
    bookingstatus:{
        type:String,
        required:[true,'Add some status for the booking']
    },
    
    serviceid:{
        type:String,
        required:[true,"Add service id"]
    },
    userid:{
        type:String,
        required:[true,'Add user id']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('ServiceBooking',ServiceBookingSchema);