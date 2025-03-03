import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,  
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

//pre hook to convert the passwrod into hash
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})


//methods to check if the password types by the user while login is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


//methods to generate the access token
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            //Payload
            _id:this._id,
            email:this.email,
            fullname:this.fullname,
            username:this.username,

        },
        //secretKey
        process.env.ACCESS_TOKEN_SECRET,
        {
            //options
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//methods to generate the refresh token
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,  // Payload
        },
        process.env.REFRESH_TOKEN_SECRET,  // Secret Key
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY  // Options
        }
    );
};


const User = mongoose.model("User",userSchema)

export default User;