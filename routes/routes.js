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
            populateDB();
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");

            }
        });
    }
});

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
        "label": "s1",
        "image": "/img/house.png",
        "group": 2
    },{
        "name": "kids1",
        "label": "s2",
        "image": "/img/star.gif",
        "group": 3
    }, {
        "name": "kids2",
        "label": "s3",
        "image": "/img/star.gif",
        "group": 3
    }, {
        "name": "region2",
        "label": "s4",
        "image": "/img/house.png",
        "group": 4
    }, {
        "name": "kids3",
        "label": "s5",
        "image": "/img/star.gif",
        "group": 5
    }, {
        "name": "kids4",
        "label": "s6",
        "image": "/img/star.gif",
        "group": 5
    }, {
        "name": "region3",
        "label": "s7",
        "image": "/img/house.png",
        "group": 6
    }, {
        "name": "kids5",
        "label": "s8",
        "image": "/img/star.gif",
        "group": 7
    }, {
        "name": "kids6",
        "label": "s9",
        "image": "/img/star.gif",
        "group": 7
    }, {
        "name": "kids7",
        "label": "s10",
        "image": "/img/star.gif",
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
   if(req.body.donors.length > 0){
    var donor = req.body.donors[0].donor;
    console.log("updating donor :", donor);   
    var cursor =db.collection('donors').find();
    cursor.each(function(err, doc) {
        if (doc != null) {
            console.log("list of nodes: ", JSON.stringify(doc));
            //var nodes = 
            //res.writeHead(200, { "Content-Type": "application/json" });
            //var response = {'x':'2'};
            //res.end(JSON.stringify(doc));
        }
}); 
   }
//


};
