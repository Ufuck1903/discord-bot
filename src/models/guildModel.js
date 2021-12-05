const mongoose = require("mongoose");
const guildModel = mongoose.Schema({
    /*
    * its a guildModel
    * */
}, {_id: false});
module.exports = mongoose.model("guildModel", guildModel)