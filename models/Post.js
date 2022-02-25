var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const PostSchema= new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User',required:true},
    post:{type:String,required:true,maxlength:4000},
    title:{type:String,required:true,maxlength:20},
    comment:[{type:Schema.Types.ObjectId,ref:'Comment'}],
    timestamp:{type:Number,required:true}
});

module.exports=mongoose.model('Post',PostSchema);