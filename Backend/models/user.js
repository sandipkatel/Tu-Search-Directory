const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;
const bcryptjs = require('bcryptjs');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(id, name,email, password, admin){
        this._id = id? id: null;
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = admin? admin: false;
    }


    save() {
        const db = getDb();
        db.collection('Users').insertOne(this)
        .then(result => console.log("Saved Successfully!"))
        .catch(err => console.log(err));
    }

    static findbyMail(email, callback, errorHandler) {
        let db = getDb();
        db.collection('Users').find({email: email}).toArray(
            (err,result) => {
                if(err) {
                    errorHandler(err);
                } else {
                    callback(result);
                    
                }

            }
        );
    }


    static getUsers(callback) {
        let db = getDb();
        db.collection('Users').find({}).toArray(
            (err, results) => {
                callback(results);
            }
        );
    }

    static  findById(id) {
        let db = getDb();
        return db.collection('Users').findOne({_id: new ObjectId(id)});
    }

    static deleteUserbyId(id) {
        let db = getDb();
        db.collection('Nodes').deleteOne({_id: new ObjectId(id)})
        .then(result => {
            console.log('Deleted Successfully');
        })
        .catch(err => console.log(err))
    }


    static editById(id, node) {
        let db = getDb();
        db.collection('Nodes').updateOne({_id: new ObjectId(id)}, {$set: 
        {
            name: node.name,
            email: node.email,
            admin: node.admin,
            password: node.password
        }})
        .then(result => console.log('Editing successful!'))
        .catch(err => console.log(err))
    }

}

module.exports = User;