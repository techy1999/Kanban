// const { db } = require("../models/Card");
const Card = require("../models/Card");
const List = require("../models/List");
const { validationResult } = require('express-validator');

/* RETURN ALL THE CARDS */
exports.getAllCards = async (req, res,next) => {
    let cards;
    try {
        cards = await Card.find();
    } catch (error) {
        return res.status(500).json({ message: `Unknown reason ${error}` });
    }
    if (!cards) {
        return res.status(400).json({ message: 'Empty Cards' });
    }
    return res.status(200).json({ cards });
}

/* RETURN A SINGLE CARD BY ID */
exports.getCardById = async (req,res,next) =>{
    const cardId = req.params.id;
    let card;
    try {
        card = await Card.findById(cardId);
    } catch (error) {
        return res.status(500).json({ message: `Unknown reason ${error}` });
    }
    if(!card){
        return res.status(404).json({ message: "No card found" });
    }
    return res.status(200).json({card});
}

/* CREATE A SINGLE CARD */
exports.createCard = async (req, res,next) => {

    const { title,list} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            "message":"Already title exist"
        });
    }

    let existingList;

    try {
        existingList = await List.findById(list);
    } catch (error) {
        return res.status(500).json({ message: `Unknown reason ${error}` });
    }
    
    if(!existingList){
        return res.status(400).json({message:"Unable to find the user with the id"});
    }
    

    const card = new Card({
        title,
        list
    });

    try {
        await card.save();
        existingList.cards.push(card);
        await existingList.save();
    } catch (error) {
        return res.status(500).json({ message: `Unknown reason ${error}` });
    }
    if (!card) {
        return res.status(400).json({ message: "Unable to create card" });
    }
    return res.status(201).json({ card });

}

/* GET ALL THE CARD FOR A PARTICULAR LIST */
exports.getAllCardForList = async (req,res,next) =>{
    const listId = req.params.id;

    let listCards;
    try {
        listCards = await List.findById(listId).populate("cards");
    } catch (error) {
        return res.status(500).json({ message1: `Unknown reason ${error}` });
    }
    if(!listCards){
        return res.status(404).json({ message: "No Card found for this list"});
    }
    return res.status(200).json({ cards: listCards });
}

/* DELETE A CARD BY ID   update the reference list also*/
exports.deleteCard = async (req,res,next) => {
    const cardId = req.params.id;
    // console.log("cardId", cardId);
    let card;
    let existingList;
    try {
        card = await Card.findByIdAndRemove(cardId).populate('list');
        // console.log("card : ", card);
        // console.log("card : ", card.list);
        existingList = await List.findById(card.list);
        existingList.cards.pop(card);
        await existingList.save();
    } catch (error) {
        return res.status(400).json({message:"Unable to delete the card or do not exist"})
    }

    if(!card){
        return res.status(500).json({message:"Unable to delete the card"})
    }
    return res.status(200).json({message:"Card deleted successfully !!"})
}

/* PATCH update card by card Id */
exports.updateCard = async (req,res,next) => {
    const cardId = req.params.id;
    console.log(cardId);

    const {title} = req.body;

    let card;
    try {
        card = await Card.findByIdAndUpdate(cardId, {
            title
        })
    } catch (error) {
        return res.status(500).json({message:" Unable to update the card"})
    }
    
    if(!card){
        return res.status(500).json({message:" Unable to update the card"})
    }

    return res.status(200).json({message:"Card updated Successfully !"})
}

//CHANGE ON DRAG THE LISTID OF THE CARD..
exports.updateCardListId = async (req,res,next) => {
    const cardId = req.params.id;
    console.log(cardId);

    const {id, title} = req.body;
    console.log("id && title : ", id , title);

    let card;
    try {
        card = await Card.findByIdAndUpdate(cardId)
        console.log("card updateCardListId ", card);
    } catch (error) {
        return res.status(500).json({message:" Unable to update the card"})
    }
    
    if(!card){
        return res.status(500).json({message:" Unable to update the card"})
    }

    return res.status(200).json({message:"Card updated Successfully !"})
}


