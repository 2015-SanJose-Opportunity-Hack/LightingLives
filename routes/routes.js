var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('hackdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'hackdb' database");
        db.collection('donors', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});



exports.findDonor = function(req, res) {
    console.log('nitain');
    var cursor =db.collection('donors').find();
    cursor.each(function(err, doc) {
        if (doc != null) {
            res.writeHead(200, { "Content-Type": "application/json" });
            //var response = {'x':'2'};
            res.end(JSON.stringify(doc));
        }
});
};

exports.findKids = function(req, res) {
    console.log('findKids : ', req.param('child'));
    var cursor =db.collection('kids').find({"_id": req.param('child')});
    cursor.each(function(err, doc) {
        if (doc != null) {
            console.log(JSON.stringify(doc));
            //res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(doc));
        }
   });
};
exports.insertKids = function(req, res) {
    console.log('ajax call')
    console.log('ajax call request : ',req.body)
    console.log('insertKids');
    db.collection('kids').save(req.body,function(error, docs){
    if(error != null)
        console.log("data insert error : ", error);
       res.redirect('/');
    });
    console.log('insertKids : done');
   if(req.body.donors.length > 0){
    var donor = req.body.donors[0].donor;
    var cursor =db.collection('donors').find();
    cursor.each(function(err, doc) {
        if (doc != null) {
            console.log("list of nodes: ", JSON.stringify(doc));
            var nodes = doc["nodes"];
            var nodeSize = nodes.length;
            var links = doc["links"];
            var linksSize = links.length;

            console.log("nodes : ", JSON.stringify(nodes));
            console.log("links : ", JSON.stringify(links));
            console.log("nodes size :", nodeSize);
            console.log("links size :", linksSize);

            var regionIndex = 0;

            for(var i = 0 ; i < nodes.length; i++){
                if(nodes[i].name == req.body.region){
                    regionIndex = nodes[i].label;
                }
            }

            var kidIndex = nodeSize + 1;

            //res.writeHead(200, { "Content-Type": "application/json" });
            //var response = {'x':'2'};
            console.log("updating donor :", donor);   
            db.collection('donors').update({}, {
                $addToSet:{
                    nodes : {
                        "name": req.body.name,
                        "label": kidIndex,
                        "image": req.body.timeline[0].picture,
                        "group": 7
                    },
                    links : {
                        "source": regionIndex,
                        "target": kidIndex,
                        "value": 1
                      }
                }
            });
            res.end(JSON.stringify(doc));

        }
    });
 
   }
//


};
