import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    _id : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true
    }, 

    description : {
        type : String,
        required : true
    },



})