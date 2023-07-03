const Node = require('../models/node');

exports.addNode = (req, res, next) => {
    let node = new Node(null, req.body.name, req.body.info, req.body.children, req.body.root);
    node.save();
    next();
}

exports.editNode = (req, res, next) => {
    let node = new Node(req.body._id, req.body.name, req.body.info, req.body.children, req.body.root);
    Node.editById(req.body._id, node);
    next();
}

exports.deleteNode = (req, res, next) => {
    let id = req.body.id;
    Node.deleteSubTree(id);
    Node.removeIdFromParent(id);
    next();
}