var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('lighting', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'lighting' database");
        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});


exports.findAll = function(req, res) {
    db.collection('uses', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
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