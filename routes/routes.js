var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/hackathon';
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('hackathon', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'hackathon' database");
        db.collection('donor', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});


//exports.findDonor = function(req, res) {
//    MongoClient.connect(url, function (err, db) {
//        if (err) {
//            console.log('Unable to connect to the mongoDB server. Error:', err);
//    } else {
//        //HURRAY!! We are connected. :)
//        console.log('Connection established to', url);
//
//        // Get the documents collection
//        var collection = db.collection('donor');
//
//        // Insert some users
//            var cursor =collection.find();
//            console.log('cursor' + JSON.stringify(cursor));
//            //res.send(cursor);
//            res.writeHead(200, { "Content-Type": "application/json" });
//            //var response = {'x':'2'};
//            res.end(JSON.stringify(cursor));
//
//        }
//});
//
//};



exports.findDonor = function(req, res) {
    console.log('nitain');
    var cursor =db.collection('donor').find();
    cursor.each(function(err, doc) {
        if (doc != null) {
            res.writeHead(200, { "Content-Type": "application/json" });
            //var response = {'x':'2'};
            res.end(JSON.stringify(doc));
        }
});

//    var c = {"name": "flare","children": [{"name": "analytics","children": [{"name": "cluster","children": [{"name": "AgglomerativeCluster","size": 3938}]}]}]};
//    console.log('cursor' + cursor);
//    console.log('cursor' + JSON.stringify(c));
    //res.send(cursor);
   // res.writeHead(200, { "Content-Type": "application/json" });
    //var response = {'x':'2'};
    //res.end(JSON.stringify(cursor));
    //return cursor;

};





/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    //var wines = [
    //{
    //    name: "CHATEAU DE SAINT COSME",
    //    year: "2009",
    //    grapes: "Grenache / Syrah",
    //    country: "France",
    //    region: "Southern Rhone",
    //    description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
    //    picture: "saint_cosme.jpg"
    //}];
    //
    //db.collection('wines', function(err, collection) {
    //    collection.insert(wines, {safe:true}, function(err, result) {});
    //});

};