const requestHost = (state = [], action) => {
    switch(action.type){
        case 'REQUEST_HOST':
            console.log("inside requestHost reducer")
            return [...state, action.payload]
            default: 
            return state;
    }
}

export default requestHost;