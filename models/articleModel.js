var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  body:{
    type:String
  }
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
