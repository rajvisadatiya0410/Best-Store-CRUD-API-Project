const mongoose=require ('mongoose');

const schema=mongoose.Schema({
    id:Number,
    name:String,
    brand:String,
    category:String,
    price:Number,

})

module.exports=mongoose.model("product",schema);