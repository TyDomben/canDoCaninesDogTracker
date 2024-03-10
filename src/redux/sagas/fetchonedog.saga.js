import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_DOG_PROFILE" actions
function* fetchOneDog(action) {
  const { dogId } = action.payload;
try{
  const oneDogResponse = yield axios.get(`/api/dog/${dogId}`)
    yield put({ type: 'SET_ONE_DOG_PROFILE', payload: oneDogResponse.data });
    console.log("oneDogResponse.data", oneDogResponse.data)
}catch(error){
  console.error("Failed to fetch dog profile", error)
}}


function* oneDogSaga() {
  yield takeLatest('FETCH_ONE_DOG_PROFILE', fetchOneDog);
}

export default oneDogSaga;