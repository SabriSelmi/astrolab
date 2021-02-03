const Wishlist = require("../models/wishlist");
const { validVars } = require("../utils");
module.exports = {
    addWishlist : async (req, res, next)=>{
        try {
            const {name} = req.body;
            const id_user = req.user._id;
            if(validVars([id_user, name])){
                const newWishlist = new Wishlist({
                id_user, name
            })
            await newWishlist.save();
            res.status(200).json({
                success : true,
                message : "Wishlist added successfully"
            })
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
    editWishlist : async (req, res, next)=>{
        try {
            const id_wishlist = req.params.id;
            const {name} = req.body;
            await Wishlist.updateOne({_id : id_wishlist},{name});
            res.status(200).json({
                success : true,
                message : "Wishlist updated successfully"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured, make sure you fill all informations and try again"
            })
        }
    }, 
    deleteWishlist : async (req, res, next)=>{
        try {
            const id_wishlist = req.params.id;
            await Wishlist.deleteOne({_id : id_wishlist});
            res.status(200).json({
                success : true,
                message : "Wishlist deleted successfully"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured, try again!"
            })
        }
    },  
    getWishlist : async (req, res, next)=>{
        try {
            const id_wishlist = req.params.id;
            const wishlist = await Wishlist.findOne({_id : id_wishlist});
            res.status(200).json({
                success : true,
                wishlist
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured!"
            })
        }
    }, 
    getWishlists : async (req, res, next)=>{
        try {
            const id_user = req.user._id;
            const wishlists = await Wishlist.find({id_user});
            res.status(200).json({
                success : true,
                wishlists
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : "An error has been occured!"
            })
        }
    }
}