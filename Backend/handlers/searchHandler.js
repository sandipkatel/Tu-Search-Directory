const Node = require('../models/node');

exports.generalHandler =  (req,res,next) => {
    Node.generalSearch(req.query['keyword'], (result) => {
        console.log(result);
        res.status(200).json({message: 'retrieval successful', body: result});
        next();
    });
}

exports.personnelHandler = (req, res, next) => {
    Node.personnelSearch(req.query['keyword'], (result) => {
        console.log(result);
        res.status(200).json({message: 'retrieval successful', body: result});
        next();
    })
}

exports.programHandler = (req, res, next) => {
    Node.programSearch(req.query['keyword'], (result) => {
        console.log(result);
        res.status(200).json({message: 'retrieval successful', body: result});
        next();
    })
}

exports.nameHandler = (req, res, next) => {
    Node.nameSearch(req.query['keyword'], (result) => {
        console.log(result);
        res.status(200).json({message: 'retrieval successful', body: result});
        next();
    })
}