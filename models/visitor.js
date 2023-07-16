const mongoose = require('mongoose');
// const validator = require('validator');

const visitorSchema = new mongoose.Schema({
    visitorID:{
        type:String,
        required:[true,'please enter id'],
        unique:true
    },
    firstName: {
        type: String,
        required: [true, 'Please enter FirstName']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter LastName']
    },
    nic: {
        type: String,
        required: [true, 'Please enter nic'],
        unique:true
        // maxlength: [10, 'nic cannot exceed 10 characters'],

    },
    description: {
        type: String,
        required: [true, 'Please enter descri[tion ']
    },
    vehicleType: {
        type: String,
        required: [true, 'Please enter vehicle type'],
        // unique:true

        // validate: [validator.isEmail, 'Please enter valid email address']
    },
    licenceNo:{
        type:String,
        required: [true, 'Please enter licence no'],

    },
    checkIn: {
        type: String,
        required: [true, 'Please enter checkIn'],
        // max:[6,"password should be 6 character"],
        // maxlength: [10, 'Password cannot exceed 10 characters'],
        // select: false
    },

    checkout: {
        type: String,
        required:[true,'please enter checkout'],
        // validate:[validator.isMobilePhone,'Please enter valid phone number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('visitor', visitorSchema)