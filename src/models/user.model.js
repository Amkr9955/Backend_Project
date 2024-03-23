import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";//jwt is bearer token like tala-chabhi jiske pass
//token hai access to data is given to that user
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type: String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true,
    },
    coverImage:{
        type:String  //cloudinary url
    },
    watchHistory:[      //this makes project complex we use mongoose aggregate package fro aggregation query
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{              // a challenge
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
   if(!this.isModified("password")) return next();
    
   this.password=await bcrypt.hash(this.password,10)
   next()
   //10 indicates rounds of encryption it can be any number
   //the problem here arise will be everytime a user changes anything and save
   //this password will be changed everytime therefore if condition used
})         
 //data save hone se pehle kuch kaam kardo this plugin is for that
//like encryption of password
//async beacuse algorithm takes time to execute while encrypt,decrypt
//and function instead of ()=> {} cause the latter one doesn't have context of this

//we can create own method appart from provided by node
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){//access token return karta hai
    return jwt.sign({//payload
        _id:this.id,
        email:this.email,
        uername:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {//object for expiry
        expiresIN:process.env.ACCESS_TOKEN_EXPIRY

    })
    //sign genrates token
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({//payload
        _id:this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {//object for expiry
        expiresIN:process.env.REFRESH_TOKEN_EXPIRY

    })
}

export const User=mongoose.model("User",userSchema)