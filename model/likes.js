const mongoose=require('mongoose')

const likesSchema=new mongoose.Schema({
    userId:{
        type:ObjecId,
        ref:"User"
    },
    videoId:{
        type:ObjectId,
        ref:"Video"
    }
},{timestamps:true})


///to be added later is commentslike model
