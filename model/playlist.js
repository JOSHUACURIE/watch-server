const mongoose=require('mongoose');

const playlistSchema=new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    description:String,
    visibility:{
        type:String,
        enum:["public","private"],
        default:"private"
    },
    thumbnail:String,
    videosCount:Number
},{timestamps:true});



module.exports=mongoose.model("Playlist",playlistSchema);