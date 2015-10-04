var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('hackdb', server, {safe: true});

db.open(function(err, db) {
    cleanDB();
    if(!err) {
        console.log("Connected to 'hackdb' database");
        db.collection('donors', {safe:true}, function(err, collection) {
            populateDB();
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");

            }
        });
    }
});

var cleanDB = function(){
    console.log('cleanDB');
    db.collection('donors', function (err, collection) {
        collection.remove({}, {safe:true}, function(err, result){});
    });


};


var populateDB = function () {
    console.log('populateDB');
    var donor = [
        {
            "nodes": [{
                "name": "root",
                "label":"root",
                "image": "/img/sun.png",
                "group": 1
            }, {
                "name": "region1",
                "label": "1",
                "image": "/img/house.png",
                "hover_image": "/images/region1.png",
                "group": 2
            },{
                "name": "kid1",
                "label": "2",
                "image": "/img/star.gif",
                "hover_image": "images/kid1.png",
                "group": 3
            }, {
                "name": "kid2",
                "label": "3",
                "image": "/img/star.gif",
                "hover_image": "images/kid2.png",
                "group": 3
            }, {
                "name": "region2",
                "label": "4",
                "image": "/img/house.png",
                "hover_image": "/images/region2.png",
                "group": 4
            }, {
                "name": "kid3",
                "label": "5",
                "image": "/img/star.gif",
                "hover_image": "images/kid3.png",
                "group": 5
            }, {
                "name": "kid4",
                "label": "6",
                "image": "/img/star.gif",
                "hover_image": "images/kid4.png",
                "group": 5
            }, {
                "name": "region3",
                "label": "7",
                "image": "/img/house.png",
                "hover_image": "/images/region3.png",
                "group": 6
            }, {
                "name": "kid5",
                "label": "8",
                "image": "/img/star.gif",
                "hover_image": "images/kid5.png",
                "group": 7
            }, {
                "name": "kid6",
                "label": "9",
                "image": "/img/star.gif",
                "hover_image": "images/kid6.png",
                "group": 7
            }, {
                "name": "kid7",
                "label": "10",
                "image": "/img/star.gif",
                "hover_image": "images/kid7.png",
                "group": 7
            }],
            "links": [{
                "source": 0,
                "target": 1,
                "value": 1
            }, {
                "source": 1,
                "target": 2,
                "value": 1
            }, {
                "source": 1,
                "target": 3,
                "value": 1
            }, {
                "source": 0,
                "target": 4,
                "value": 1
            }, {
                "source": 4,
                "target": 5,
                "value": 1
            }, {
                "source": 4,
                "target": 6,
                "value": 1
            }, {
                "source": 0,
                "target": 7,
                "value": 1
            }, {
                "source": 7,
                "target": 8,
                "value": 1
            }, {
                "source": 7,
                "target": 9,
                "value": 1
            }, {
                "source": 7,
                "target": 10,
                "value": 1
            }]
        }
   ];

    db.collection('donors', function (err, collection) {
        collection.insert(donor, {safe:true}, function(err, result){});
    });
};

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
            if(regionIndex === 0){
                //nodeSize += 1;
                regionIndex = nodeSize;
                nodeSize += 1;
                console.log("region index : ", regionIndex);
                console.log("nodes size :", nodeSize);
                console.log("creating new region :", req.body.region);   
                db.collection('donors').update({}, {
                    $addToSet:{
                        nodes : {
                            "name": req.body.region,
                            "label": regionIndex,
                            "image": "/img/house.png",
                            "group": 7
                        },
                        links : {
                            "source": 0,
                            "target": regionIndex,
                            "value": 1
                        }
                    }
                });
            }

            var kidIndex = nodeSize;

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
