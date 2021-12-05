const mongoose = require("mongoose");
const userModel = mongoose.Schema({
    /*
    * its a usermodel
    * */
}, {_id: false});
module.exports = mongoose.model("userModel", userModel)