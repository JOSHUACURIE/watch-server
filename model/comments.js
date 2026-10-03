const mongoose=require('mongoose')

const commentsSchema= new mongoose.Schema({
    videoId:{
        type:ObjectId,
        ref:"Video"
    },
    userId:{
        type:ObjectId,
        ref:"User"
    },
    parentCommentId:{},
    content:String,
    likesCount:Number,
    isEdited:Boolean,
    isDeleted:Boolean
},{timestamps:true});


module.exports=mongoose.model("Comments",commentsSchema);