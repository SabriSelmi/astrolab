let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create Product Schema

const PRODUCTSCHEMA = new Schema({
    id_user : {
      type: Schema.Types.ObjectId,
      required: true,
      ref :"user"
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        required: true,
        ref : 'wishlist'
    },
    status: {
        type : String,
        enum : [
            'bought', 'to buy'
          ],
        required : true
    },
    image : {
        type : String,
        default : "https://res.cloudinary.com/natulyn/image/upload/v1612184228/default-pro_aexujq.jpg"
    }
  
},{timestamps:true})

// Create a model
const PRODUCT = mongoose.model('product', PRODUCTSCHEMA);

// Export the model
module.exports = PRODUCT
