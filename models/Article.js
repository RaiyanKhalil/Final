var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  rName: {
    type: String,
    required: "Title required"
  },
  rRate: {
    type: Number,
    required: "Rating required"
  },
  rComment: {
    type: String,
    required: "Commnet required"
  }
});

var Article = mongoose.model('Article', articleSchema)
module.exports = Article;
