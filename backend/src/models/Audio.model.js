import { Schema, model } from "mongoose";
import simpleCryptoJs from 'simple-crypto-js';
const SimpleCrypto = simpleCryptoJs.default;

const audioSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    mood:{
        type: String,
        required: true,
    },
    file:{
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    unlocksAt:{
        type: Date,
        required: true,
    },
    notified: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

audioSchema.pre('save', function(next){
    if(!this.isModified('file')){
        return next();
    }
    try {
        const simpleCrypto = new SimpleCrypto(process.env.SIMPLE_CRYPTO_SECRET);
        this.file = simpleCrypto.encrypt(this.file);
        next();
    } catch (error) {
        next(error);
    }
})

export const Audio = model('Audio', audioSchema);