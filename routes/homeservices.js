const express=require('express');
const router = express.Router();
const {getServiceBookings,addServiceBookings,deleteServiceBookings}=require('../controllers/servicesbookingController');

router
    .route('/')
    .get(getServiceBookings)
    .post(addServiceBookings);

router.route('/:id').delete(deleteServiceBookings);

module.exports=router;
