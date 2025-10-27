import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    _id : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true,
        default: Date.now
    }, 

    description : {
        type : String,
        required : true
    },

    amount : {
        type: mongoose.Schema.Types.Decimal128,
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
} , {
    toJSON: {
        transform: function (doc, ret) {
            if (ret.date) {
                ret.date = ret.date.toISOString().split('T')[0];
            }

              if (ret.amount && ret.amount.$numberDecimal) {
                ret.amount = parseFloat(ret.amount.$numberDecimal);
            }
        }
    }


})


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;