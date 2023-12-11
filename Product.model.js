const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect(process.env.DB_URL);

const productSchema = new Schema({
    title:String,
    price:Number
});

var Product = mongoose.model('Product',productSchema);

module.exports=Product;