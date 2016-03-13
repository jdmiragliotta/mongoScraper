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

// var Note = require('./models/noteModel.js');
var Article = require('./models/articleModel.js');



app.get("/", function(req, res){
  //Scrape Reddit
  request("https://www.reddit.com/r/CSS", function (error, response, html) {
    var $ = cheerio.load(html);
    $("p.title").each(function(i, element) {
      var title = $(this).text();
      var link = $(element).children().attr('href');
    });
  });
 // Create New Instance
  var insertedArticle = new Article({
    "title" : title,
    "link": link
  });
  // Save to Database
  insertedArticle.save(function(err, dbArticle) {
    if (err) {
      console.log(err);
    } else {
      console.log(dbArticle);
    }
  });

  res.sendFile(process.cwd() + '/index.html')
});



app.listen(PORT, function() {
  console.log('App running on port %s', PORT);
});
