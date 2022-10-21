const express = require('express');
const Card = require("../models/Card");
const cardController = require("../controller/card-controller");
const { body } = require('express-validator');
const router = express.Router();

//GET all cards endpoint
router.get("/cards", cardController.getAllCards);

//GET single card endpoint
router.get("/card/:id", cardController.getCardById);

//POST single card endpoint
router.post("/card", body("title").custom(value => {
    return Card.find({
        title: value
    }).then(title => {
        if (title.length > 0) {
            // Custom error message and reject
            // the promise
            return Promise.reject('Already  title exist');
        }
    });
}), cardController.createCard);

// GET all the cards for a particular list of all cards endpoint
router.get("/cards/list/:id", cardController.getAllCardForList);

//DELETE a single card using ID endpoint
router.delete('/card/:id', cardController.deleteCard);

//PUT update a single card
router.put('/card/:id', cardController.updateCard);

router.put('/card/list/:id', cardController.updateCardListId);





module.exports = router;