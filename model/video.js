const mongoose=require('mongoose');

const videoSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:100
    },
    uploaderId:{
        type:ObjectId,
        ref:"User"
    },
    description:String,
    videoUrl:String,
    duration:String,
    thumbnailUrl:String,
    visibility:{
        type:String,
        enum:["public","private","unlisted"]
    },
    status:{
        type:String,
        enum:["processing","ready","failed"]
    },
    likesCount:Number,
    commentCount:Number,
    categoryId:{
        type:ObjectId,
        ref:"Category"
    }

},{timestamps:true});


module.exports= mongoose.model("Video",videoSchema);