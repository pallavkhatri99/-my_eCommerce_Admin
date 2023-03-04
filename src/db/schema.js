const mongoose = require('mongoose');
const electroniProductSchema = new mongoose.Schema(
    {
    name:String,
    image:String,
    price:String,
    discount:String,
    category:String,
    type:String,
    rating:String,
    inStock:Boolean,
    deliveryfree:Boolean,
    RAM:String,
    ROM:String,
    color:String,
    battery:String
    }
);
const applicatoinProductSchema = new mongoose.Schema(
    {
    name:String,
    image:String,
    price:String,
    discount:String,
    category:String,
    type:String,
    rating:String,
    inStock:Boolean,
    deliveryfree:Boolean
    }
);
const fashionProductSchema = new mongoose.Schema(
    {
    name:String,
    image:String,
    price:String,
    discount:String,
    category:String,
    type:String,
    rating:String,
    inStock:Boolean,
    deliveryfree:Boolean
    }
);
const homeProductSchema = new mongoose.Schema(
    {
    name:String,
    image:String,
    price:String,
    discount:String,
    category:String,
    type:String,
    rating:String,
    inStock:Boolean,
    deliveryfree:Boolean
    }
);
const groceryProductSchema = new mongoose.Schema(
    {
    name:String,
    image:String,
    price:String,
    discount:String,
    category:String,
    type:String,
    rating:String,
    inStock:Boolean,
    deliveryfree:Boolean
    }
);
const toyProductSchema = new mongoose.Schema(
    {
    name:String,
    image:String,
    price:String,
    discount:String,
    category:String,
    type:String,
    rating:String,
    inStock:Boolean,
    deliveryfree:Boolean
    }
);

const ElectroniProduct = mongoose.model('Electronic_Product',electroniProductSchema)
const ApplicationProduct = mongoose.model('Application_Product',applicatoinProductSchema)
const FashionProduct = mongoose.model('Fashion_Product',fashionProductSchema)
const HomeProduct = mongoose.model('Home_Product',homeProductSchema)
const GroceryProduct = mongoose.model('Grocery_Product',groceryProductSchema)
const ToyProduct = mongoose.model('Toy_Product',toyProductSchema)




module.exports = {ElectroniProduct,ApplicationProduct,FashionProduct,HomeProduct,GroceryProduct,ToyProduct}

