/* Importera */
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

mongoose.connect("mongodb://felicia:rt7fc8yuk10@ds026658.mlab.com:26658/forum", {useMongoClient: true});
mongoose.Promise = global.Promise;

var Post = require("./routes/api/post");

// Skapa instans av express
var app = express();

// Middleware
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Skapa statisk sökväg
app.use(express.static(path.join(__dirname, 'public')));

// Skicka alla poster
app.get("/api/posts", function (req, res) {
    Post.find(function(err, Post){
        if(err) {
            res.json(err);
        } else {
            res.json(Post);
        }
    });
});

// Läs ut specifik post från id
app.get("/api/posts/:id", function (req, res) {
    Post.findById(req.params.id, function(err, Post){
        if(err) {
            res.json(err);
        } else {
            res.json(Post);
        }
    }) 
});

// Uppdatera befintlig post
app.put("/api/posts/:id", function(req, res){
    Post.findOneAndUpdate({
        name: req.body.name,
        text: req.body.text,
    }).then(Post =>{
        res.json(Post)
    });
});

// Lägga till post
app.post("/api/posts/add", function (req, res) {

    var poster = new Post();

    poster.name = req.body.name;
    poster.text = req.body.text;

    poster.save(function(err) {
        if(err){
            res.json(err);
        } else {
            res.json({message: "Inlägg lagrat"});
        }
    });
});

// Ta bort post
app.delete("/api/posts/delete/:id", function (req, res) {
    Post.remove({_id: req.params.id}, function(err){
        if(err) {
            res.json(err);
        } else {
            res.json({message : "Inlägg raderat"})
        }
    });
});

// Port för anslutning
var port = process.env.PORT || 3000;

// Starta servern
app.listen(port, function () {
    console.log("Servern är startad på port " + port);
});