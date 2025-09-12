import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({

    consent : {
        type : Boolean,
        required : true,
        default: false
    },

    accountId : {
        type : String,
        ref : 'Account'
    }

})

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;