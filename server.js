var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var cheerio = require("cheerio")
var request = require("request")
var expressHandlebars = require("express-handlebars");
var app = epress();
var PORT = process.env.PORT || 8000;

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));

//Connect To Database
mongoose.connect("mongodb://localhost/scrapernotes");
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


// Routes
app.get('/', function(req, res) {
  res.send("index.html");
});




//Scrapes Hacker News
app.get("/scrape", function(req, res){
  request('https://news.ycombinator.com/', function (error, response, html) {
    var $ = cheerio.load(html);
    var result = [];
    $('td.title:nth-child(3)>a').each(function(i, element){
      var title = $(element).text(),
      var link =  $(element).attr('href')
      if(title && link){
        db.scrapedData.save({
          title: title,
          link: link
        }, function(err,saved){
          if(err){
            console.log(err);
          }else{
            console.log(saved);
          }
        });
      }
    });
  });
});



app.listen(3000, function(){
  console.log("App running!");
});
