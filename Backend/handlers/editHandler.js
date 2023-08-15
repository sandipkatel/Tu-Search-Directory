const { Collection } = require('mongodb');
const getDb = require('../utils/database').getDb;
const Node = require('../models/node');

exports.addNode = async(req, res, next) => {
    const db = getDb();
    const nodesCollection = db.collection('Nodes');
    const parent = await nodesCollection.findOne({ name: req.body.parentName });

    if(parent && parent._id){
        let node = new Node(null, req.body.instituteName, req.body.info, req.body.children, req.body.root);
        node.save();
        Node.addIdToParent(req.body.instituteName,req.body.parentName);
        res.status(200).json({message: "Information added successfully"});
    }
    else{
        res.status(400).json({message: "Wrong Information"});
    }
    // console.log(req.body)
    next();
}

exports.editNode = (req, res, next) => {
    // let node = new Node(req.body._id, req.body.name, req.body.info, req.body.children, req.body.root);
    // Node.editById(req.body._id, node);
    // next();
    console.log(req.body.personName)
}

exports.deleteNodebyId = (req, res, next) => {
    let id = req.body.id;
    Node.deleteSubTree(id);
    Node.removeIdFromParent(id);
    next();
}



exports.addPersonnel = (req, res, next) => {
    // console.log(req.body.organization)
    // console.log(req.body.personName)
    let personnel={
        name:req.body.personName,
        imageUrl:req.body.imageUrl,
        title:req.body.personTitle,
        email:req.body.personEmail
    }
    Node.addPersonnel(personnel,req.body.organization)
    next();
}

exports.addProgram = (req, res, next) => {
    // console.log(req.body.organization)
    // console.log(req.body.personName)
    let programmes={
        name:req.body.programTitle,
        description:req.body.programDesc
    }
    Node.addProgram(programmes,req.body.organization)
    next();
}

exports.editPersonnel = (req, res, next) => {
    // let node = new Node(req.body._id, req.body.name, req.body.info, req.body.children, req.body.root);
    // Node.editById(req.body._id, node);

    let personnel={
        name:req.body.personName,
        imageUrl:req.body.imageUrl,
        title:req.body.personTitle,
        email:req.body.personEmail
    }
    let isedited=Node.editPersonnel(personnel,req.body.previousName)
    if(!isedited){
        res.status(400).json("Wrong Information")
    }
    next();
}

exports.deletePersonnel = (req, res, next) => {
    // let personnel={
    //     name:req.body.personName,
    //     imageUrl:req.body.imageUrl,
    //     title:req.body.personTitle
    // }
    Node.deletePersonnel(req.body.previousName)
    next();
}

exports.deleteProgram = (req, res, next) => {
    // let personnel={
    //     name:req.body.personName,
    //     imageUrl:req.body.imageUrl,
    //     title:req.body.personTitle
    // }
    Node.deleteProgram(req.body.previousName,req.body.organization)
    next();
}