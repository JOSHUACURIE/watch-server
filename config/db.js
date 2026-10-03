const mongoose=require('mongoose');


const connectDB=async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo db database connected successfully");
    } catch (error) {
        console.error("Error: ",error)
        console.log("An error has occured")
        
    }
}

module.exports=connectDB;