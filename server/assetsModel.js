
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var httpStatus = require("http-status-codes");
var url = 'mongodb://localhost:27017/MEAN-App';
var collectionName = "Assets";

var exports = module.exports ={};

exports.insertDocuments = function(doc, callback) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            db.close();
            callback(httpStatus.INTERNAL_SERVER_ERROR);
        }
        var collection = db.collection(collectionName);
        collection.insert(doc, function(err, result) {
            if(err){
                db.close();
                console.log('Failed to insert document..! :' + doc);
                callback(httpStatus.INTERNAL_SERVER_ERROR);
            }
            db.close();
            console.log(result.result.n);
            callback(httpStatus.CREATED);
        });
    });
};

exports.updateDocument = function(doc, callback) {
    console.log('update hit');
    MongoClient.connect(url, function(err, db) {
        if (err){
            db.close();
            console.log('1');
            callback(httpStatus.INTERNAL_SERVER_ERROR);
        }
        var collection = db.collection(collectionName);
        var writeResult = collection.update(
            {_id: ObjectId(doc._id)},
            doc,{upsert : false, multi : false},
            function(err,result){
                if (err) {
                    db.close();
                    console.log("Failed to update the document..! " + doc);
                    callback(httpStatus.INTERNAL_SERVER_ERROR);
                }
                db.close();
                if(result.result.n)
                    callback(httpStatus.NO_CONTENT);
                else
                    callback(httpStatus.INTERNAL_SERVER_ERROR);
            }
        );
    });
};

exports.removeDocument = function(id, callback) {
    console.log("delete hit.")
    MongoClient.connect(url, function(err, db) {
        if (err){
            db.close();
            callback(httpStatus.INTERNAL_SERVER_ERROR);
        }
        var collection = db.collection(collectionName);
        collection.remove(
            {_id: ObjectId(id)}, function (err, result) {
                if (err) {
                    db.close();
                    console.log("Failed to remove the document..! " + doc);
                    callback(httpStatus.INTERNAL_SERVER_ERROR);
                }
                db.close();
                if(result.result.n)
                    callback(httpStatus.NO_CONTENT);
                else
                    callback(httpStatus.INTERNAL_SERVER_ERROR);
            });
    });
};

exports.getAllDocs = function(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err){
            db.close();
            return null;
        }
        var collection = db.collection(collectionName);
        collection.find({}).toArray(function (err, docs) {
            if(err){
                db.close();
                console.log("failed to fetch records..! : " + err);
                return null;
            }
            db.close();
            callback(docs);
        });
    });
};
