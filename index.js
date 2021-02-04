'use strict'
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
let path = require('path');
const { getCurrencies } = require("./utils.js");
const { checkToken } = require("./controllers/userController.js");
const app = express();
const PORT = process.env.PORT || 3007;

// use middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// connect database
mongoose
    .connect(process.env.MONGODB_URI 
        , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongodb connected...');
        // use routes declared 

        app.use("/user",require('./routes/userRoutes.js'));
        app.use("/wishlist",require('./routes/wishlistRoutes.js'));
        app.use("/product",require('./routes/productRoutes.js'));
        app.get("/currencies", checkToken, getCurrencies);

        // serve builded client in production
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '/client/build')));
            app.get('*', function(req, res) {
                const index = path.join(__dirname, '/client/build', 'index.html');
                res.sendFile(index);
            });
        }
        // create server
        app.listen(PORT, (err) => {
            if (err) {
                console.log('Cant Connect')
            } else {
                console.log('runing in port ' + PORT)
            }
        })
    })
    .catch(err => console.log(err.response))

module.exports = app