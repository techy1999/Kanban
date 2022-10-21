//EXTERNAL PACKAGE IMPORTS
const express = require('express');
const swaggerDoc = require('swagger-ui-express');
const mongoose = require("mongoose");
var helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');  



//FOLDER IMPORTS
const swaggerDocumation = require('./api_docs/documentation');
const ListRoutes = require("./routes/list");
const CardRoutes = require("./routes/card");

const app = express();

//ADD LOCAL DB 
// const url = "mongodb://localhost/Kanban";
// mongoose.connect(url);
// const conn = mongoose.connection;

// conn.on("open",()=>{
//     console.log("DB Connected !!");
// })


// const uri = "mongodb+srv://sudhanshu:12345asd@mycluster.vpmrumy.mongodb.net/Kanban?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB Connected !!");
}).catch((err)=>{
    console.log("Oh no error in db connection ... ",err);
})

app.use(cors());
app.use(express.json()); //able to req body in json format
app.use(helmet()); // Securing the header

// ROUTE FOR LIST AND CARD
app.use('/api/v1', ListRoutes);
app.use('/api/v1', CardRoutes);


//--     ROUTES FOR SWAGGER DOCUMENTATION           --- // 
app.use('/documentations',swaggerDoc.serve);
app.use('/documentations',swaggerDoc.setup(swaggerDocumation));

app.listen(process.env.PORT,()=>{
    console.log("Server started on !",process.env.PORT);
});