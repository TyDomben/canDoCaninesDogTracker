const dogProfile = (state = [], action) => {
    switch(action.type){
        case 'SET_DOG_PROFILE':
            console.log("inside dog profile reducer")
            return action.payload
            default:
                return state;
    }
}

export default dogProfile;

