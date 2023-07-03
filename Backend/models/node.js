const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class Node {
    constructor(id, name,info, children, root){
        this._id = id? id: null;
        this.name = name;
        this.info = info;
        this.children = children;
        this.root = root? root: false;
    }


    save() {
        const db = getDb();
        db.collection('Nodes').insertOne(this)
        .then(result => console.log("Saved Successfully!"))
        .catch(err => console.log(err));
    }


    static getNodes(callback) {
        let db = getDb();
        db.collection('Nodes').find({}).toArray(
            (err, results) => {
                callback(results);
            }
        );
    }

    static  findById(id) {
        let db = getDb();
        return db.collection('Nodes').findOne({_id: new ObjectId(id)});
    }

    static deleteOneNode(id) {
        let db = getDb();
        db.collection('Nodes').deleteOne({_id: new ObjectId(id)})
        .then(result => {
            console.log('Deleted Successfully');
        })
        .catch(err => console.log(err))
    }

    static generalSearch(keyword, callback) {

        let db = getDb();
        db.collection('Nodes').find({$text: {$search: keyword}})
        .toArray(
            (err, result) => {
                if(err){
                    throw(err);
                }
                callback(result);
            }
        )
    }

    static nameSearch(keyword, callback) {
        let db = getDb();
        let pattern = '.*'+keyword+'.*';
        db.collection('Nodes').find({name: {$regex: pattern, $options: 'i'}})
        .toArray(
            (err, result) => {
                if(err){
                    throw(err);
                }
                callback(result);
            }
        )
    }

    static personnelSearch(keyword, callback) {
        let db = getDb();
        let pattern = '.*'+keyword+'.*';
        db.collection('Nodes').find({"info.personnel.name": {$regex:pattern, $options:'i'}})
        .toArray(
            (err, result) => {
                if(err) {
                    throw(err);
                }
                console.log(result);
                let totalResult = [...result];
                db.collection('Nodes').find({"info.personnel.title": {$regex:pattern, $options:'i'}})
                .toArray(
                    (err, result) => {
                        if(err) {
                            throw(err);
                        }
                        console.log(result);
                        totalResult = [...totalResult, ...result];
                        callback([...new Set(totalResult)]);
                    }
                )
            }
        )
    }

    static programSearch(keyword, callback) {
        let db = getDb();
        let pattern = '.*'+keyword+'.*';
        db.collection('Nodes').find({"info.programmes.name": {$regex:pattern, $options:'i'}})
        .toArray(
            (err, result) => {
                if(err) {
                    throw(err);
                }
                
                callback(result);
            }
        )
    }

    static deleteSubTree(id) {
        let db = getDb();
        db.collection('Nodes').findOne({_id: new ObjectId(id)})
        .then(document => {
            for (childId of document.children){
                Node.deleteSubTree(childId)
            } 
            Node.deleteNode(id);
        })
        .catch(err => console.log(err))
    }

    static _changeChildID(nodeId, remId) {
        let db = getDb();
        db.collection('Nodes').findOne({_id: nodeId})
        .then(result => {
            if(remId in result.children){
                pos = result.children.indexOf(remId);
                result.children.splice(pos, 1);
                Node.editById(result._id, result);
                return 1
            } else {
                for(childId of result.children){
                    Node._changeChildID(childId, remId);
                }
            }
            return 0
        })
    }

    static removeIdFromParent(id) {
        let db = getDb();
        db.collection('Nodes').findOne({root: true})
        .then(result => {
            Node._changeChildID(result._id)
        })
        .catch(err => {
            console.log(err);
        })
    }

    static editById(id, node) {
        let db = getDb();
        db.collection('Nodes').updateOne({_id: new ObjectId(id)}, {$set: 
        {
            name: node.name,
            children: node.children,
            root: node.root,
            info: node.info
        }})
        .then(result => console.log('Editing successful!'))
        .catch(err => console.log(err))
    }

}

module.exports = Node