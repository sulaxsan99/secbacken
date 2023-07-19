const mongoose = require('mongoose');
// const validator = require('validator');

const ScheduleSchema = new mongoose.Schema({
    ScheduleID: {
        type: String,
        required: [true, 'Please enter ScheduleID'],
        unique:true,
    },
    date: {
        type: Date,
        required: [true, 'Please enter Date']
    },
    Description: {
        type: String,
        required: [true, 'Please enter Description']
    },
    Asssignedto: {
        type: String,
        required: [true, 'enter assigned to'],
        // maxlength: [10, 'nic cannot exceed 10 characters'],
    },
    startTime: {
        type: String,
        required: [true, 'Please enter start time'],
        // unique:true

        // validate: [validator.isEmail, 'Please enter valid email address']
    },
   
   
    EndTime:{
        type:String,
        required: [true, 'Please enter End time'],

    },
  
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Schedule', ScheduleSchema)