import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import dog from './dog.reducer';
import fetchOneDogProfile from './fetchonedog.reducer';
import deleteDogProfile from './deletedog.reducer';
import requestHost from './requesthost.reducer';
import raiserDogReducer from './raiserDog.reducer';
<<<<<<< HEAD
import volunteerHost from './volunteerhost.reducer';
=======
// import volunteerHost from './volunteerHost.reducer';
>>>>>>> 66ff405377b8391cca949e26d7403b13e959f1cd


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in

  dog, //contains "dogs" table data
  fetchOneDogProfile,
  deleteDogProfile,
  requestHost,
  raiserDogReducer,
  // volunteerHost,

});

export default rootReducer;
