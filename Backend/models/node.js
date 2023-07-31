const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class Node {
    constructor(id, name, info, children, root) {
        this._id = id ? id : null;
        this.name = name;
        this.info = info;
        this.children = children;
        this.root = root ? root : false;
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

    static findById(id) {
        let db = getDb();
        return db.collection('Nodes').findOne({ _id: new ObjectId(id) });
    }

    static deleteOneNode(id) {
        let db = getDb();
        db.collection('Nodes').deleteOne({ _id: new ObjectId(id) })
            .then(result => {
                console.log('Deleted Successfully');
            })
            .catch(err => console.log(err))
    }

    static generalSearch(keyword, callback) {

        let db = getDb();
        db.collection('Nodes').find({ $text: { $search: keyword } })
            .toArray(
                (err, result) => {
                    if (err) {
                        throw (err);
                    }
                    callback(result);
                }
            )
    }

    static nameSearch(keyword, callback) {
        let db = getDb();
        let pattern = '.*' + keyword + '.*';
        db.collection('Nodes').find({ name: { $regex: pattern, $options: 'i' } })
            .toArray(
                (err, result) => {
                    if (err) {
                        throw (err);
                    }
                    callback(result);
                }
            )
    }

    static personnelSearch(keyword, callback) {
        let db = getDb();
        let pattern = '.*' + keyword + '.*';
        db.collection('Nodes').find({ "info.personnel.name": { $regex: pattern, $options: 'i' } })
            .toArray(
                (err, result) => {
                    if (err) {
                        throw (err);
                    }
                    console.log(result);
                    let totalResult = [...result];
                    db.collection('Nodes').find({ "info.personnel.title": { $regex: pattern, $options: 'i' } })
                        .toArray(
                            (err, result) => {
                                if (err) {
                                    throw (err);
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
        let pattern = '.*' + keyword + '.*';
        db.collection('Nodes').find({ "info.programmes.name": { $regex: pattern, $options: 'i' } })
            .toArray(
                (err, result) => {
                    if (err) {
                        throw (err);
                    }

                    callback(result);
                }
            )
    }

    static deleteSubTree(id) {
        let db = getDb();
        db.collection('Nodes').findOne({ _id: new ObjectId(id) })
            .then(document => {
                for (childId of document.children) {
                    Node.deleteSubTree(childId)
                }
                Node.deleteNode(id);
            })
            .catch(err => console.log(err))
    }

    static _changeChildID(nodeId, remId) {
        let db = getDb();
        db.collection('Nodes').findOne({ _id: nodeId })
            .then(result => {
                if (remId in result.children) {
                    pos = result.children.indexOf(remId);
                    result.children.splice(pos, 1);
                    Node.editById(result._id, result);
                    return 1
                } else {
                    for (childId of result.children) {
                        Node._changeChildID(childId, remId);
                    }
                }
                return 0
            })
    }

    static removeIdFromParent(id) {
        let db = getDb();
        db.collection('Nodes').findOne({ root: true })
            .then(result => {
                Node._changeChildID(result._id)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static editById(id, node) {
        let db = getDb();
        db.collection('Nodes').updateOne({ _id: new ObjectId(id) }, {
            $set:
            {
                name: node.name,
                children: node.children,
                root: node.root,
                info: node.info
            }
        })
            .then(result => console.log('Editing successful!'))
            .catch(err => console.log(err))
    }

    static async addIdToParent(childName, parentName) {
        const db = getDb();

        try {

            const nodesCollection = db.collection('Nodes');
            const newChild = await nodesCollection.findOne({ name: childName });
            const parent = await nodesCollection.findOne({ name: parentName });

            if (parent) {
                const parentId = parent._id;
                let childIdString = JSON.stringify(newChild._id)
                childIdString = childIdString.replace(/^"(.*)"$/, '$1');
                parent.children.push(childIdString);

                await nodesCollection.updateOne(
                    { _id: ObjectId(parentId) },
                    { $set: { children: parent.children } }
                );

                console.log("Child ID successfully appended to the parent document.");
            } else {
                console.log("Parent not found.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    static async addPersonnel(personnel, orgarizationName) {
        const db = getDb();
        const nodesCollection = db.collection('Nodes');
        try {
            const newOrganization = await nodesCollection.findOne({ name: orgarizationName });
            if (newOrganization) {
                if (!newOrganization.info.personnel) {
                    newOrganization.info.personnel = [];
                }
                newOrganization.info.personnel.push(personnel);

                await nodesCollection.updateOne(
                    { _id: newOrganization._id },
                    { $set: { 'info.personnel': newOrganization.info.personnel } }
                );

                console.log("Personnel Successfully added");
            }
            else {
                console.log("Organization not found");
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editPersonnel(personnel, previousName) {
        const db = getDb();
        const nodesCollection = db.collection('Nodes');
        try {
            const organization = await nodesCollection.findOne({ 'info.personnel.name': previousName });
            if (organization) {
                const personnelIndex = organization.info.personnel.findIndex(p => p.name === previousName);

                if (personnelIndex !== -1) {
                    organization.info.personnel[personnelIndex] = personnel;
                    await nodesCollection.updateOne(
                        { 'info.personnel.name': previousName },
                        { $set: { 'info.personnel.$': personnel } }
                    );

                    console.log("Personnel Successfully updated");
                    return true
                } else {
                    console.log("Personnel not found");
                    return false
                }
            } else {
                console.log("Organization not found");
                return false
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deletePersonnel(previousName) {
        const db = getDb();
        const nodesCollection = db.collection('Nodes');
        console.log(previousName);
        try {
          const organization = await nodesCollection.findOne({ 'info.personnel.name': previousName });
      
          if (organization) {
            await nodesCollection.updateOne(
              { 'info.personnel.name': previousName },
              { $pull: { 'info.personnel': { name: previousName } } }
            );
      
            console.log("Person info deleted from the database.");
          } else {
            console.log("Organization not found");
          }
        } catch (err) {
          console.log(err);
        }
      }

}

module.exports = Node