const List = require("../models/List")
const { validationResult } = require('express-validator');
// GET the all list 
exports.getAllLists = async (req, res, next) => {
    let lists;
    try {
        lists = await List.find();
    } catch (error) {
        return res.status(500).json({ message: `Server Error ${error}` })
    }

    if (!lists) {
        return res.status(404).json({ message: `Empty List` })
    }
    return res.status(200).json({ lists })
}

//POST Create the new List
exports.createList = async (req, res, next) => {
    const { title } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            "message":"Already title exist"
        });
    }


    const list = new List({
        title,
        cards: []
    })

    try {
        await list.save();
    } catch (error) {
        return res.status(500).json({ message: "Server Error/Empty title" })
    }
    if (!list) {
        return res.status(400).json({ message: "Unable to create list" })
    }
    return res.status(201).json({ list })
}

//DELETE List working .... 
exports.deleteList = async (req, res, next) => {
    const listId = req.params.id;
    console.log("listId", listId);
    let deleted;
    try {
        deleted = await List.deleteOne({ _id: listId });
    } catch (e) {
        console.error(`[error] ${e}`);
        return res.status(200).json({ message: "Delete List not working error " })
    }
    return res.status(200).json({ message: "Deleted Successfully !", deleted })
}