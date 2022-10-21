const { v4: uuidv4 } = require('uuid');

const list = [{
    id: uuidv4(),
    name: "To Do",
    created_At: new Date(),
    update_At: "",
}]

const listDocs = {
    tags: ["List"],
    description: "List all of the List and card",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            list
                        }
                    }
                }
            }
        }
    }
}

const createlistDocs = {
    tags: ["List"],
    description: "Create a new list on board.",
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

const deletelistDocs = {
    tags: ["List"],
    description: "Delete a list from Board using board Id",
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


const listRouteDoc = {
    "/lists": {
        get: listDocs
    },
    "/list": {
        post: createlistDocs
    },
    "/{id}":{
        delete: deletelistDocs
    }

}

module.exports = listRouteDoc