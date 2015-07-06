var express = require("express");
var assetsHandler = require("./assetsModel.js");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

var router= express.Router();

router.put('/',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = req.body;
    var data = assetsHandler.updateDocument(doc,
        function(status){
            res.status(status);
            res.send();
        }
    );
});

router.delete('/:_id',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    var idToBeDeleted = req.params._id;
    var data = assetsHandler.removeDocument(idToBeDeleted,
        function(data){
            res.status(status);
            res.send();
        }
    );
});

router.post('/',function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("hit post");
    var doc = req.body;
    console.log(doc);
    if(!doc){
        res.send("Unable to read body..");
    }
    var data = assetsHandler.insertDocuments(doc,
        function(status){
            res.status(status);
            res.send();
        }
    );
});

router.get('/',function(req,res){
    console.log("hit get");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = assetsHandler.getAllDocs(
        function(data){
            console.log(data === undefined);
            res.json(data);
        }
    );
});

app.use("/api/assets",router);

console.log("app started listening...!");

module.exports = app;