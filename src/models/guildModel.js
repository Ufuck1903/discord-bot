const mongoose = require("mongoose");
const guildModel = mongoose.Schema({
    _id: {type: String, required: true},
    prefix: {type:String, default: "?"}
}, {_id: false});
module.exports = mongoose.model("guildModel", guildModel)