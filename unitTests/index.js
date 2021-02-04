'use strict';
// Require models
const User = require("../models/user");
const Prodcut = require("../models/product");
const Wishlist = require("../models/wishlist");

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
// Require server

const server = require("../index");

// Init vars
var token="";
var userName="test";
var password="test";
var email = "test@test.com";
var id_product = "";
var id_wishlist = "";


/***************** User routes  **************/
describe("USER", ()=>{
    before(async ()=>{
        let user = await User.findOne({
            userName
        })
        if(user){
            await User.deleteOne({userName})
        }
    })
    
    it("Shoud add a new user", async () => {
        let res = await chai
            .request(server)
            .post('/user/signup')
            .send({userName, password, email})               
        expect(res.status).to.equal(200)
        
    })

    it("Shoud reject adding new user with conflict 409", async () => {
        let res = await chai
            .request(server)
            .post('/user/signup')
            .send({userName, password, email})               
        expect(res.status).to.equal(409)
        
    })

    it("Shoud sign a user with userName and password", async () => {
        let res = await chai
            .request(server)
            .post('/user/signin')
            .send({sign_userName : userName, sign_password:password})  
        expect(res.status).to.equal(200);
        expect(res["headers"]["set-cookie"][0]).to.be.an('string');
        token = res["headers"]["set-cookie"][0].split(";")[0]
        
    })
    it("Shoud reject with 401 status", async () => {
        let res = await chai
            .request(server)
            .post('/user/signin')
            .send({sign_userName : userName, sign_password:"password"})  
        expect(res.status).to.equal(401)
        expect(res["headers"]["set-cookie"]).to.be.an('undefined')
        
    })
})


/***************** Wishlist routes  **************/

describe("WISHLIST", ()=>{     
    it("Shoud add a new wishlist", async () => {
        let res = await chai
            .request(server)
            .post('/wishlist/')
             .set("Cookie", `${token}`)
            .send({name: "test"})  
        expect(res.status).to.equal(200)
        
    })

    it("Shoud reject adding a new wishlist with status 500", async () => {
        let res = await chai
            .request(server)
            .post('/wishlist/')
             .set("Cookie", `${token}`)
            .send({})  
        expect(res.status).to.equal(500)
        
    })

    it("Shoud reject adding a new wishlist with status 409", async () => {
        let res = await chai
            .request(server)
            .post('/wishlist/')
             .set("Cookie", `${token}`)
            .send({name : "test"})  
        expect(res.status).to.equal(409);
        
    })

    it("Shoud get all wishlists", async () => {
        let res = await chai
            .request(server)
            .get('/wishlist/')
            .set("Cookie", `${token}`)
        expect(res.status).to.equal(200);
        expect(res.body.wishlists).to.be.an("array");
        expect(res.body.wishlists.length).to.equal(1);
        id_wishlist = res.body.wishlists[0]["_id"];
    })

    it("Shoud get a wishlist by its id", async () => {
        let res = await chai
            .request(server)
            .get('/wishlist/'+id_wishlist)
            .set("Cookie", `${token}`)
        expect(res.status).to.equal(200);
        expect(res.body.wishlist).to.be.an("object");
        expect(res.body.wishlist._id).to.equal(id_wishlist);
    })

    it("Shoud update a wishlist", async () => {
        let res = await chai
            .request(server)
            .put('/wishlist/'+id_wishlist)
            .set("Cookie", `${token}`)
            .send({
                name: "test update"
            })
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Wishlist updated successfully");
    })

})


/***************** Product routes  **************/
    describe("PRODUCT", ()=>{      
        it("Shoud add a new product", async () => {
            let res = await chai
                .request(server)
                .post('/product/')
                 .set("Cookie", `${token}`)
                .send({name: "test",
                    description: "test",
                    price: 45,
                    currency: "TND",
                    wishlist: id_wishlist,
                    status: "to buy"})  
            expect(res.status).to.equal(200)
            
        })

        it("Shoud reject adding a new product", async () => {
            let res = await chai
                .request(server)
                .post('/product/')
                 .set("Cookie", `${token}`)
                .send({
                    description: "test",
                    price: 45,
                    currency: "TND",
                    wishlist: id_wishlist,
                    status: "to buy"})  
            expect(res.status).to.equal(500)
            
        })

        it("Shoud get all products", async () => {
            let res = await chai
                .request(server)
                .get('/product/')
                .set("Cookie", `${token}`)
            expect(res.status).to.equal(200);
            expect(res.body.products).to.be.an("array");
            expect(res.body.products.length).to.equal(1);
            id_product = res.body.products[0]["_id"];
        })

        it("Shoud get a product by its id", async () => {
            let res = await chai
                .request(server)
                .get('/product/'+id_product)
                .set("Cookie", `${token}`)
            expect(res.status).to.equal(200);
            expect(res.body.product).to.be.an("object");
            expect(res.body.product._id).to.equal(id_product);
        })

        it("Shoud update a product", async () => {
            let res = await chai
                .request(server)
                .put('/product/'+id_product)
                .set("Cookie", `${token}`)
                .send({
                    name: "test update",
                    description: "test",
                    price: 45,
                    currency: "TND",
                    wishlist: id_wishlist,
                    status: "to buy"
                })
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Product updated successfully");
        })

        it("Shoud get all products related to a specific wishlist", async () => {
            let res = await chai
                .request(server)
                .get('/product/products/'+id_wishlist)
                .set("Cookie", `${token}`)
            expect(res.status).to.equal(200);
            expect(res.body.products).to.be.an("array");
            expect(res.body.products.length).to.equal(1);
        })
    })
   

/************* Delete routes ************/

describe("DELETE PRODUCT AND WISHLIST", ()=>{       
    after(()=>{
        process.exit(0)
    })
    it("Shoud delete a product defined by its id", async (done) => {
        let res = await chai
            .request(server)
            .delete('/product/'+id_product)
            .set("Cookie", `${token}`)
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Product deleted successfully");
    })

    it("Shoud delete a wishlist defined by its id", async () => {
        let res = await chai
            .request(server)
            .delete('/wishlist/'+id_wishlist)
            .set("Cookie", `${token}`)
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Wishlist deleted successfully");
    })
})

