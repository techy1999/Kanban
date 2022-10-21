const express = require('express');
const List = require("../models/List")
const ListController = require("../controller/list-controller");
const { body } = require('express-validator');
const router = express.Router();

//GET all cards endpoint
router.get("/lists", ListController.getAllLists);

//POST create new list endpoint
router.post("/list", body("title").custom(value => {
    return List.find({
        title: value
    }).then(title => {
        if (title.length > 0) {
            // Custom error message and reject
            // the promise
            return Promise.reject('Already exist title');
        }
    });
})
    , ListController.createList);

//DELETE delete the list as well the array of refernce cards
router.delete("/list/:id", ListController.deleteList);

module.exports = router;