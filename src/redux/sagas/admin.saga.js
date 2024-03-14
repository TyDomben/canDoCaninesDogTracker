import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "REMOVE_DOG_PROFILE" actions
function* fetchRequests(action) {
  try {
    const response = yield axios.get('/api/admin')
    yield put({ type: 'SET_REQUESTS', payload: response.data });
  } catch (error) {
    console.log('fetching requests failed', error);
  }
}

function* requestsSaga() {
  yield takeLatest("FETCH_REQUESTS", fetchRequests);
}

export default requestsSaga;
