import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new Schema(
    {
        avatar:{
            type:{
                url:String,
                localPath:String
            },
            default:
    
        {
            url:`htttps://placehold.co/200x200`,
            loaclPath:""
        },
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    fullname:{
        type:String,
        trim: true
    },
    password:
    {
        type:String,
        required:[true,"Password is required"]
    },
    isemailVerified:{
        type:boolean,
        default:false,
    },
    forgotPasswordToken:{ 
    type:String
    },
    emailVerificationToken:{
        type:String
    },
    refreshToken:{
        type:String
    },
    emailVerificationExpiry:{
        type:Date
    },
    forgotPasswordToken:{

    }
    },
    {
        timestamps:true
    });

    userSchema.pre("save", async function (next){
        if(!isModified(password)){
            return;
        }
        this.password= await bcrypt.hash(this.password, 10);
    });

    userSchema.methods.isPasswordCorrect((password)=>{
        return bcrypt.compare(password, this.password);
    })
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {

            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};


userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

    export const User=mongoose.model("User", userSchema)