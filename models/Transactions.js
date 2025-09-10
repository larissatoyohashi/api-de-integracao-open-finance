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

    amount : {
        type: Schema.Types.Decimal128,
        required: true
    }, 
    type : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    }


})


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;