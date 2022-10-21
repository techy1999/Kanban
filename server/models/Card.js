const mongoose  = require("mongoose");

//Schema structure for Card in MONGODB
const CardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default: Date.now,
        required:true,
    },
    updated_at:{
        type:Date,
    },
    list:{
        type:mongoose.Types.ObjectId,
        required:true
    }   
});

module.exports = mongoose.model("Card", CardSchema);