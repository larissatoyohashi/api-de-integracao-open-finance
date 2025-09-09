import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    
    _id : {
        type : String,
        required : true,
    },

    name: {
        type : String,
        required : true,
    },

    cpf : {
        type : String,
        required : true,
        unique : true,
    },
    
    email : {
        type : String, 
        required : true,
    },

    accounts: {
        type : Schema.Types.ObjectId,
        ref : 'Account'
    },
        _id : false

});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
