const raiserDogReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_DOGS':
            return action.payload;
            default: return state;
    }
}


export default raiserDogReducer;