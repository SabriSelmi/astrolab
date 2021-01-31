'use strict'
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
let path = require('path');
const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(process.env.MONGODB_URI ||
        'mongodb+srv://SabriSelmi:10101992house*@natulyn-nscik.mongodb.net/cv-maker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.log(err.response))

app.use("/user",require('./routes/userRoutes.js'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', function(req, res) {
        const index = path.join(__dirname, '/client/build', 'index.html');
        res.sendFile(index);
    });
}

app.listen(PORT, (err) => {
    if (err) {
        console.log('Cant Connect')
    } else {
        console.log('runing in port ' + PORT)
    }
})
module.exports = app