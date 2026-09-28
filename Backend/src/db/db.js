const dns = require("dns");

dns.setServers(["1.1.1.1"]);

const mongoose = require("mongoose");

async function connectdb () {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    }catch(error){
        console.log("error in connecting to Database", error);
    }
}

module.exports = connectdb