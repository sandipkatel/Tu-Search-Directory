const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://bikal:4nFuaiDNvjINBnH7@tu-searchable-directory.amugqkd.mongodb.net/?retryWrites=true&w=majority')
.then(client => {
    _db = client.db();
    if(_db){
        console.log('connected')
    } else {
        console.log('not connected')
    }
    callback();
}).catch(
    err => {
        console.log(err);
        throw(err);
    }
);

}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No Database Found!";
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
