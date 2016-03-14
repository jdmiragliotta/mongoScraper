var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var logger = require('morgan');
var expressHandlebars = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8000;

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

//Connect To Database
mongoose.connect("mongodb://localhost/scraperNotes");
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//Require Schema

var Note = require('./models/noteModel.js');
var Article = require('./models/articleModel.js');



app.get("/", function(req, res){
  //Scrape Reddit
  request("https://news.ycombinator.com/", function (error, response, html) {
    var $ = cheerio.load(html);
    $("td.title:nth-child(3)>a").each(function(i, element) {

      var articleTitle = $(element).text();
      var articleLink = $(element).attr('href');
      // console.log(articleTitle);
      // console.log(articleLink);
      // Create New Instance
      var insertedArticle = new Article({
        title : articleTitle,
        link: articleLink
       });

    // Save to Database
      insertedArticle.save(function(err, dbArticle) {
        if (err) {
          console.log(err);
        } else {
          // console.log(dbArticle);
        }
      });
    });
    res.sendFile(process.cwd() + '/index.html')
  });
});

app.get('/displayInfo', function(req, res) {

  Article.find({}, function(err, articleData) {
    if(err) {
      throw err;
    }
    res.json(articleData);
  }).limit(10);
});

app.post("/submit", function(req, res){
  var newNote = new Note({
    noteBody: req.body.noteBody});

  newNote.save(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      Article.findOneAndUpdate({
        "_id": req.body.articleid},
        {$push: {'notes': doc._id}}, {new: true}, function(err, articleData) {
        if (err) {
          res.send(err);
        } else {
            res.json(articleData);
        }
      });
    }
  });
});





app.listen(PORT, function() {
  console.log('App running on port %s', PORT);
});
