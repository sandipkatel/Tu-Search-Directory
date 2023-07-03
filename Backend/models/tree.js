const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class Tree {
    constructor(root){
        this.root = root;
    }


    save() {
        const db = getDb();
        db.collection('Nodes').insertOne(this)
        .then(result => console.log("Saved Successfully!"))
        .catch(err => console.log(err));
    }

    static findById(id) {
        db = getDb();
        db.collection('Nodes').find({_id: new ObjectId(id)}).
        then(document => {
            console.log("Document found",document)
            return document
        })
        .catch(err => {
            console.log(err)
        })
    }

    static deleteById(id) {
        db = getDb();
        db.collection('Nodes').deleteOne({_id: new ObjectId(id)})
        .then(result => {
            console.log('Deleted Successfully');
        })
        .catch(err => console.log(err))
    }

    static editById(id, node) {
        db = getDb();
        db.collection('Nodes').updateOne({_id: new ObjectId(id)}, {$set: node})
        .then(result => console.log('Editing successful!'))
        .catch(err => console.log(err))
    }
}

module.exports = Node