var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/best_of_belize");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var sightSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Sight = mongoose.model("Sight", sightSchema);
 
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/sights", function(req, res) {
    Sight.find({}, function(err, sights) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {sights: sights})
        }
    });
});

app.get("/sights/new", function(req, res) {
    res.render("new.ejs"); 
});

app.post("/sights", function(req, res) {
    Sight.create({
        name: req.body.name, 
        image: req.body.image,
        description: req.body.description
    }, function(err, sight) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEW SIGHT: ");
            console.log(sight);
        }
    });
    res.redirect("/sights");
});

app.get("/sights/:id", function(req, res) {
     Sight.findById(req.params.id, function(err, foundSight) {
         if (err) {
             console.log(err);
         } else {
             res.render("show", {sight:foundSight});
         }
     });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Best of Belize has started...");
});