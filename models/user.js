let mongoose = require('mongoose')
let Schmea = mongoose.Schema
let bcrypt = require('bcrypt')

// Create User Schema

const USERSCHEMA = new Schmea({

    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  
},{timestamps:true})

USERSCHEMA.pre('save', async function (next) {
  try {
    // Generate a
    const SALT = await bcrypt.genSalt(10)
    // Generate a password hash (salt + hash)
        const PASSWORDHASH = await bcrypt.hash(this.password, SALT) 
        // Re-assign hashed version over original, plain text password
        this.password = PASSWORDHASH
        next()   
  } catch (error) {
    next(error)
  }
})

USERSCHEMA.methods.isValidPassword = async function (newPassword) {
  try {
      console.log(newPassword, "===", this.password)
    return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

// Create a model
const USER = mongoose.model('user', USERSCHEMA)

// Export the model
module.exports = USER
