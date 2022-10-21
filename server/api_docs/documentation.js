const cardRouteDoc = require("../routes/card.swaggerdocs");
const listRouteDoc = require("../routes/list.swaggerdocs");

const swaggerDocumation = {
    openapi: "3.0.0",
    info: {
        title: "Kanban",
        version: "0.0.1",
        description: "Kanban board to track the workflow of the project ",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description:"Local dev"
        },
        {
            url: "http://production",
            description:"Production dev"
        }
    ],
    tags:[
        {
            name:"List",
            description: "List of boards"
        },
        {
            name:"Card",
            description: "card"
        }
    ],

    paths: {
        ...listRouteDoc,
        ...cardRouteDoc
    },

}

module.exports = swaggerDocumation;