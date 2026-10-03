const User=require('../model/user');
const bcrypt=require('bcryptjs')
const crypto=require('crypto');
const jwt=require('jsonwebtoken')


const ACCESS_TOKEN_SECRET  = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const register=async(req,res)=>{
   try{
 const{username,email,password,displayName}=req.body;

 if(!username || !email || !password || !displayName){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    })
 }

 const userExists= await User.findOne({email:email});
 if(userExists){
    return res.status(401).json({
        success:false,
        message:"Email already exists"
    })
 }

 const hashedPassword= await bcrypt.hash(password,12);

 const user= new User({
    username:username,
    email:email,
    passwordHash:hashedPassword,
    role:"user",
 })

 console.log("user created successfully")
 await user.save();

 return res.status(201).json({
    success:true,
    message:"Account created successfully"
 })

   }catch(error){
    console.error("Error: ",error)
    return res.status(500).json({
        success:false,
        message:"An error has occured"
    })

   }
}


const login=async(req,res)=>{
try {
    const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    })
}

const user= await User.findOne({email:email});
if(!user){
    return res.status(403).json({
        success:false,
        message:"email does not exists"
    })
}
const passwordhash=user.passwordHash;

const passwordMatch=await bcrypt.compare(password,passwordhash);
if(!passwordMatch){
    return res.status(403).json({
        success:false,
        message:"Invalid credentials"
    })
}

const accessToken = jwt.sign(
  { sub: user._id, role: user.role },
  ACCESS_TOKEN_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { sub: user._id },
  REFRESH_TOKEN_SECRET,
  { expiresIn: "7d" }
);

return res.status(200).json({
    success:true,
    message:"Login successful",
    accessToken
})

} catch (error) {
    console.error("Error: ",error);
    return res.status(500).json({
        success:false,
        message:"An error occured"
    })
    
}
}
const getUserById=async(req,res)=>{
    try {
        const userId=req.params.id;
    if(!userId){
        return res.status(400).json({
            success:false,
            message:"User Id is required"
        })}


const user= await User.findById({userId});
if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"
    })
}
return res.status(200).json({
    success:false,
    message:"User found successfully",
    user
})

    } catch (error) {
        console.error("Error: ",error);
        return res.status(500).json({
            success:false,
            message:"An error has occured"
        })
        
    }
}


const getAllUsers=async(req,res)=>{
    try{
const userRole=req.sub.role;

if(!userRole==="admin"){
    return res.status(401).json({
        succees:false,
        message:"you are not allowed"
    })
}

    }catch(error){
console.error("error: ",error);
return res.status(500).json({
    success:false,
    message:"An error has occured"
})
    }
}


module.exports={
    register:register,
    login:login,
    ById:getUserById,
    AllUsers:getAllUsers
}