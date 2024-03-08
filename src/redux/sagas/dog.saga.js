import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRaiserDogs() {
  try {
    const response = yield axios.get("/api/raiser-dog");
    yield put({ type: "SET_USER_DOGS", payload: response.data });
  } catch (error) {
    console.log("Lost dogs!", error);
  }
}


// worker Saga: will be fired on "FETCH_DOG_PROFILE" actions
function* fetchDog() {
  try {
  //get the dogs:
  const dogResponse = yield axios.get('/api/dog')
    yield put({ type: 'SET_DOG_PROFILE', payload: dogResponse.data });
  } catch (error) {
    console.log('dog get request failed', error);
  }
}

function* updateDog (action) {
  try {
    const { dogId, updates } = action.payload;
    yield axios.patch(`/api/dog/${dogId}`, updates)
    yield put ({ type: 'FETCH_DOG_PROFILE' })
  }
  catch(err) {
    console.log('Error updating dog in saga:', err)
  }
}


function* dogSaga() {
  yield takeLatest('FETCH_DOG_PROFILE', fetchDog);
  yield takeLatest("FETCH_USER_DOGS", fetchRaiserDogs);
  yield takeLatest('UPDATE_DOG_PROFILE', updateDog);
  yield takeLatest('SET_USER_DOGS', fetchDogs);

}

export default dogSaga;

