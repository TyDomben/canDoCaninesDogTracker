const fetchOneDogProfile = (state = {}, action) => {
    switch(action.type){
        case 'SET_ONE_DOG_PROFILE':
            console.log("inside fetch OneDogprofile reducer")
            return action.payload
            default:
                return state;
    }
}

export default fetchOneDogProfile;