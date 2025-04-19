import {Schema, model} from 'mongoose';
import {hash, compare} from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        minLenght: 3,
        maxLength: 30
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    token:{
        type: String,
        default: null
    },

}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try {
        this.password = await hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password){
    return await compare(password, this.password);
}

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    
    return token;
}

export const User = model('User', userSchema);