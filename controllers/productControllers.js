const multer= require ('multer');
const Product = require("../models/product");
const Datauri = require('datauri');
const path = require('path');

const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "natulyn",
    api_key: process.env.CLOUDINARY_API_KEY?  process.env.CLOUDINARY_API_KEY: "121219237514686",
    api_secret: process.env.CLOUDINARY_API_SECRET? process.env.CLOUDINARY_API_SECRET:"OgNFVVxgdP6nQep-7D5Glfmy71c",
  })

const imageStorage= multer.memoryStorage();

// filtering files
let fileFilter=(req, file, cb)=>{
    // accept only images of jpeg and png extension
    if (file.mimetype==="image/jpeg" || file.mimetype==="image/png")
    {
        cb(null, true)
    }
    else
    {
        cb(new Error("accept only images"), false)
    }
}
let uploadPicture= multer({
    storage:imageStorage,
    fileFilter: fileFilter
  })
module.exports = {
    addProduct : async (req, res, next)=>{
        try {
            const {name, price, currency, description, wishlist, status} = req.body;
            console.log("name",name, typeof(name))
            if(name!=="undefined" && 
               price!=="undefined" && 
               currency!=="undefined" && 
               description!=="undefined" && 
               wishlist!=="undefined" && 
               status!=="undefined"){
                if(req.file){
                    const file = dataUri(req).content; 
                    cloudinary.uploader.upload(file,async (result)=>
                    {
                        try {
                            const image = result.secure_url;
                            const newProduct = new Product({
                                name, price, currency, description, wishlist, status, image
                            })
                            await newProduct.save();
                            res.status(200).json({
                                success : true,
                                message : "Product added successfully"
                            })
                       
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({
                                success : false,
                                message : "An error has been occured, make sure you fill all informations and try again"
                            })
                        }
                       })  
                } else{
                    const newProduct = new Product({
                        name, price, currency, description, wishlist, status
                    })
                    await newProduct.save();
                    res.status(200).json({
                        success : true,
                        message : "Product added successfully"
                    })
                }           
            }else{
                  res.status(500).json({
                    success : false,
                    message : "An error has been occured, make sure you fill all informations and try again"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured, make sure you fill all informations and try again"
            })
        }
    }, 
    editProduct : async (req, res, next)=>{
        try {
            const id_product = req.params.id;
            const {name, price, currency, description, wishlist, status} = req.body;
            if(req.file){
                const file = dataUri(req).content; 
                cloudinary.uploader.upload(file,async (result)=>
                {
                    await Product.updateOne({_id : id_product},{name, price, currency, description, wishlist, status, image : result.secure_url});
                    res.status(200).json({
                        success : true,
                        message : "Product updated successfully"
                    })
                })
            }else{
                await Product.updateOne({_id : id_product},{name, price, currency, description, wishlist, status});
                res.status(200).json({
                    success : true,
                    message : "Product updated successfully"
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured, make sure you fill all informations and try again"
            })
        }
    }, 
    deleteProduct : async (req, res, next)=>{
        try {
            const id_product = req.params.id;
            await Product.deleteOne({_id : id_product});
            res.status(200).json({
                success : true,
                message : "Product deleted successfully"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured, try again!"
            })
        }
    },  
    getProduct : async (req, res, next)=>{
        try {
            const id_product = req.params.id;
            const product = await Product.findOne({_id : id_product});
            res.status(200).json({
                success : true,
                product
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured!"
            })
        }
    }, 
    getProducts : async (req, res, next)=>{
        try {
            const products = await Product.find({});
            res.status(200).json({
                success : true,
                products
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured!"
            })
        }
    },
    getProductsWishlist : async (req, res, next)=>{
        try {
            const {id} = req.params;
            const products = await Product.find({wishlist : id});
            res.status(200).json({
                success : true,
                products
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured!"
            })
        }
    },
    uploadPicture
}