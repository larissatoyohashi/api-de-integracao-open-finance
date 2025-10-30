import mongoose from "mongoose";

const consentSchema = new mongoose.Schema({

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

const Consent = mongoose.model('Consent', consentSchema);

export default Consent;