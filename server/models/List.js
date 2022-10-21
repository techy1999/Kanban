const mongoose  = require("mongoose");

//Schema structure for List in MONGODB
const ListSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default: Date.now,
    },
    updated_at:{
        type:Date,
        default: Date.now,
    },
    cards:[
        {
            type:mongoose.Types.ObjectId,
            required:true
        }
    ]
})

module.exports = mongoose.model("List", ListSchema);