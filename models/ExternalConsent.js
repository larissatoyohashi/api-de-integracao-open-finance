import mongoose from "mongoose";

const externalConsentSchema = new mongoose.Schema({

    customer :{
        type: String,
        ref: 'Customer',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['AUTHORIZED', 'PENDING', 'REVOKED', 'UNAUTHORIZED'],
        default: 'UNAUTHORIZED',

    }, apiKey: {
        type: String,
        required: false,
    }
},
{ timestamps: true });

const ExternalConsent = mongoose.model('ExternalConsent', externalConsentSchema);

export default ExternalConsent;