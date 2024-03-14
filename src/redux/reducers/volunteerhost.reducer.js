const volunteerHost = (state = [], action) => {
    switch (action.type) {
      case "VOLUNTEER_HOST_SUCCESS":
        return [...state, action.payload];
  
      case "VOLUNTEER_HOST_FAILURE":
        console.error("Volunteer host failed:", action.error);
        return state;
  
      default:
        return state;
    }
  };
  
  export default volunteerHost;