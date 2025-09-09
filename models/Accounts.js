import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },

    type : String,

    branch : {
        type : String,
        required : true
    },

    number : {
        type : String,
        required : true
    },

    balance : {
        type : String,
        required : true
    },

    transactions : {
        type : Schema.Types.ObjectId,
        ref : 'Transaction'
    },

    _id : false

})

const Account = mongoose.model('Account', accountSchema);

export default Account;
