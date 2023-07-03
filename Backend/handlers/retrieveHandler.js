const Node = require('../models/node');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

function convertToJSON(node, nodeList) {
    (node.info)?node.info._id = node._id: node.info = {_id: node._id};
    (node.info)?node.info.root = node.root: node.info = {root: node.root};
    let nodeJSON = {
        label: node.name,
        data: node.info,
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
    };
    if(node.children.length > 0) {
        nodeJSON.children = [];
        for(let childId of node.children){
            
            let childNode = nodeList.find(element => element._id.toString() === childId);
            nodeJSON.children.push(convertToJSON(childNode, nodeList))
        }    
    }
    return nodeJSON
}

const retrieveHandler = (req, res, next) => {
    Node.getNodes((results) => {
            let nodeList = results;
            rootNode = nodeList.find(element => element.root === true);
            body = convertToJSON(rootNode, nodeList);
            res.setHeader('content-type','application/json');
            res.status(200).json({message:"Retrieval Successful", body: JSON.stringify(body)});
            next();
    });
    
}

module.exports = retrieveHandler;