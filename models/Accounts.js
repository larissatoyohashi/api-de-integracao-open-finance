import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true,
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
       type: mongoose.Schema.Types.Decimal128,
       default : '0.00'
    },

    transactions : [{
        type : String,
        ref : 'Transaction'
    }],
  
}, {
        _id : false,
        versionKey : false
}, {
    toJSON: {
        transform: function (doc, ret) {

              if (ret.balance && ret.balance.$numberDecimal) {
                ret.balance = parseFloat(ret.balance.$numberDecimal);
            }
        }
    }

});


const Account = mongoose.model('Account', accountSchema);

export default Account;
