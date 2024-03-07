const deleteDogProfile = (state = [], action) => {
    switch(action.type){
        case 'REMOVE_DOG_PROFILE':
            console.log("inside removedog reducer")
            // return state.filter(cat => cat.pet_info_id !== action.payload.catId);
            default:
                    return state;
    }
}

export default deleteDogProfile;