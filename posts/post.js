var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Skapa schema
var postSchema = new Schema({
    name: String,
    text: String
});

module.exports = mongoose.model("Post", postSchema);