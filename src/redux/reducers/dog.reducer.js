import { combineReducers } from 'redux';

const userDogReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_DOGS':
            return action.payload;
        default:
            return state;
    }
}

const dogProfile = (state = [], action) => {
    switch(action.type) {
        case 'SET_DOG_PROFILE':
            console.log("inside dog profile reducer")
            return action.payload;
        default:
            return state;
    }
}

const editDog = (state = {}, action) => {
    console.log('action', action.payload)
    if (action.type === 'SET_EDIT_DOG') {
        return action.payload;
    } else if (action.type === 'EDIT_DOG') {
        console.log('action.payload', action.payload);
        return {
            ...state,
            [action.payload.property]: action.payload.value
        }
    } else if (action.type === 'EDIT_CLEAR') {
        return {};
    }
    return state;
}

const rootReducer = combineReducers({
    userDogs: userDogReducer,
    dogProfile: dogProfile,
    editDog: editDog
});

export default rootReducer;
