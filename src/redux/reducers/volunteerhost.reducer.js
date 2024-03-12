const volunteerHost = (state = [], action) => {
    switch(action){
        case 'VOLUNTEER_TO_HOST':
            console.log("inside volunteerHost reducer")
            return [...state, action.payload]
            default: 
            return state;
    }
}

export default volunteerHost;