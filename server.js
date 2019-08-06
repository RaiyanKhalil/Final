var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = http.Server(app);
//var mongo = require("mon")
var mongoose = require("mongoose");


var MongoClient = require('mongodb').MongoClient;

var db_url = "mongodb+srv://Raiyan:1234@cluster0-a3nmm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db_url, { useNewUrlParser: true });

MongoClient.connect(db_url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("articles2", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// var dummyArticle = {
//   title: "Test article from server",
//   content: "Test contents for this article"}


app.get('/', function (httpRequest, httpResponse) {
  httpResponse.send('hello world');
});

app.get('/first', function (httpRequest, httpResponse) {
  httpResponse.sendFile(__dirname +'/index.html');
});

app.get('/single', function (httpRequest, httpResponse) {
  httpResponse.render(__dirname +'/single.ejs');
});

// app.get('/form', function (httpRequest, httpResponse) {
//   httpResponse.sendFile(__dirname +'/form.html');
// });

app.get('/form', function (httpRequest, httpResponse) {
  httpResponse.render(__dirname +'/form.ejs');
});

// app.get('/article', function(req, res){
//   res.render(__dirname +'/article.ejs', {article: dummyArticle})
// })

app.post('/article/new', function(req, res){
  //res.sendFile(__dirname+'/form.html')
  console.log(req.body)
  MongoClient.connect(db_url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = req.body;
     dbo.collection("articles2").insertOne(myobj, function(err, res) {
       if (err) throw err;
       console.log("1 document inserted");
       db.close();
     });
  });

  })

app.listen(3000);

  //ClassWork 7
  // var server = http.createServer(function(req, res){
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/plain');
  //   res.end("Hello World\n");
  // });
  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });
