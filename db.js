const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientDataSchema = new Schema({
    "Hospital ID": {
        type: String,
        required: true
    },

    "First Name":{
        type: String,
        required: true
    },

    "Last Name":{
        type: String,
        required: true
    },

    "Patient's Name":{
        type: String,
        require: true
    },

    "Phone Number":{
        type: String,
        required: true
    },

    "Next Delivery Date": {
        type: String,
        required: true
    },

    "Location": {
        type: String,
        required: true
    },

    "Gender":{
        type: String,
        required: true
    },

    "Email":{
        type: String,
        required: true
    },

    "Delvery Area": {
        type: String,
        required: true
    },

    "Package Code":{
        type: String,
        required: true
    },

    "Status": {
        type: String,
        required: true
    }
}, )


const patientDataa = mongoose.model('patientDataa', patientDataSchema);

const riderDataSchema = new Schema({
    "dispatch rider's name":{
        type: String,
        required: true
    },

    "delivery Area":{
        type: String,
        required: true
    },

    "Number of deliveries":{
      type: Number,
      required: true

    }

}, )

const riderDataa = mongoose.model('riderDataa', riderDataSchema);


const userDetailsSchema = new  Schema({
    "Email":{
        type: String,
        required: true
    },
    "Password": {
        type: String,
        required: true
    }

})

const userDetails = mongoose.model('userDetails',userDetailsSchema)
module.exports = {patientDataa, riderDataa, userDetails}