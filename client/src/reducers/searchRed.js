const initialState = "";

const searchRed = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_TERM": 
            return action.payload
        default: return state;
    }
}

export default searchRed;