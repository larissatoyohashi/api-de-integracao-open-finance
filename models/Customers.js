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

     password: {
        type: String,
        required: [true, 'A senha é obrigatória.'],
        select: false, 
    },

    accounts: [{
        type : String,
        ref : 'Account',
    }]

    }, {
        _id : false,
        versionKey : false
});

// customerSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
    
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
