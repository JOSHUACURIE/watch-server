const mongoose=require('mongoose');

const playlistVideoSchema=new mongoose.Schema({
    playlistId:{
        type:ObjectId,
        ref:"Playlist"
    },
    videoId:{
        type:ObjectId,
        ref:"Video"
    },
    position:Number,
    addedAt:Date
},{timestamps:true})

//this one servers as the junction...it shows the relationship between videos and their playlist
module.exports=mongoose.model("PlaylistVideos",playlistVideoSchema);