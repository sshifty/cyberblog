var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const UserSchema= new Schema({
    username:{type:String,required:true,maxlength:20},
    password:{type:String,required:true,select:false},
});

module.exports=mongoose.model('User',UserSchema);