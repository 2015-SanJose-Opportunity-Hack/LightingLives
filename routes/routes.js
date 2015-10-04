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
//    var data = {
//        "_id": "kid5",
//        "name": "kid1",
//        "region": "NA",
//        "donors": [
//            {
//                "donor": "rakesh"
//            },
//            {
//                "donor": "nitish"
//            }
//        ],
//        "timeline": [
//            {
//                "picture": "pic1",
//                "date": "09-01-2015",
//                "note": "graduation"
//            },
//            {
//                "picture": "pic2",
//                "date": "10-01-2015",
//                "note": "high school"
//            },
//            {
//                "picture": "pic3",
//                "date": "11-01-2015",
//                "note": "elementary"
//            }
//        ]
//    }
    console.log('ajax call request : ',req.body)
    console.log('insertKids');
//    db.collection('kids').save(data,function(error, docs){
//        res.redirect('/')
//    });
//


};
