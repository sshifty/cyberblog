var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const CommentSchema= new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User',required:true},
    post:{type:Schema.Types.ObjectId,ref:'Post',required:true},
    comment:{type:String,required:true,maxLenght:500},
    timestamp:{type:Number,required:true}
});

module.exports=mongoose.model('Comment',CommentSchema);