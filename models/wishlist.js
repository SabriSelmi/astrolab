let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create wishlist Schema

const WISHLISTSCHEMA = new Schema({
  id_user : {
    type: Schema.Types.ObjectId,
    required: true,
    ref :"user"
  },
    name: {
      type: String,
      required: true
    }
    
},{timestamps:true})

// Create a model
const WISHLIST = mongoose.model('wishlist', WISHLISTSCHEMA);

// Export the model
module.exports = WISHLIST
