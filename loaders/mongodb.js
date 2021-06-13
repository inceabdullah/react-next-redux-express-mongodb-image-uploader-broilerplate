const { utils } = require("../helpers/");
const parsedProcess = require("dotenv").config({path: utils.pathJoin(__dirname + "/../.env")}).parsed;
const mongoose = require('mongoose');
const { MONGODB_CREDENTIAL } = parsedProcess;

const connection = mongoose.connect('mongodb+srv://' + MONGODB_CREDENTIAL +'@cluster0.0ggwm.mongodb.net/image_store?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

    db.on('error', (err)=>{
        console.error({err: "connection has not been."});
        console.error({err});
    });

    db.once('open', () => {
        console.log("connected");
    });

module.exports = mongoose;
