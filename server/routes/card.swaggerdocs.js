const { v4: uuidv4 } = require('uuid');

const card = [{
    id: uuidv4(),
    list: "reference to list",
    name: "Team meeting",
    created_At: new Date(),
    update_At: "",
}]

const getCardsDocs = {
    tags: ["Card"],
    description: "get a card",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            card
                        }
                    }
                }
            }
        }
    }
}

const createCardDocs = {
    tags: ["Card"],
    description: "Create a new card using board id and card id",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            
                        }
                    }
                }
            }
        }
    }
}

const deletecardDocs = {
    tags: ["Card"],
    description: "Delete a list from Board using board Id as well as card id",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            message:"Successfully Deleted"
                        }
                    }
                }
            }
        }
    }
}

const editCardDocs = {
    tags: ["Card"],
    description: "Edit a card using board id and card id",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            
                        }
                    }
                }
            }
        }
    }
}


const cardRouteDoc = {
    "/cards": {
        get: getCardsDocs
    },
    "/card": {
        post: createCardDocs
    },
    "/card/{id}": {
        put: editCardDocs
    },
    "/card/{cid}":{
        delete: deletecardDocs
    }
}

module.exports =cardRouteDoc