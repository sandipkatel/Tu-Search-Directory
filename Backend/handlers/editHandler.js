const { Collection } = require('mongodb');
const Node = require('../models/node');

exports.addNode = async(req, res, next) => {
    let node = new Node(null, req.body.instituteName, req.body.info, req.body.children, req.body.root);
    node.save();
    Node.addIdToParent(req.body.instituteName,req.body.parentName);
    // console.log(req.body)
    next();
}

exports.editNode = (req, res, next) => {
    // let node = new Node(req.body._id, req.body.name, req.body.info, req.body.children, req.body.root);
    // Node.editById(req.body._id, node);
    // next();
    console.log(req.body.personName)
}

exports.deleteNode = (req, res, next) => {
    let id = req.body.id;
    Node.deleteSubTree(id);
    Node.removeIdFromParent(id);
    next();
}

exports.addPersonnel = (req, res, next) => {
    // console.log(req.body.organization)
    console.log(req.body.personName)
    let personnel={
        name:req.body.personName,
        imageUrl:req.body.imageUrl,
        title:req.body.personTitle
    }
    Node.addPersonnel(personnel,req.body.organization)
    next();
}