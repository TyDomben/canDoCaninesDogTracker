import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRaiserDogs() {
  try {
    const response = yield axios.get("/api/raiser-dog").catch(error => {
      console.error("Error in fetchRaiserDogs:", error);
      throw error;
    });
    yield put({ type: "SET_USER_DOGS", payload: response.data });
  } catch (error) {
    console.log("Lost dogs!", error);
  }
}

function* addDog(action) {
  try {
    const postDog = yield axios.post("/api/dog", action.payload).catch(error => {
      console.error("Error in addDog:", error);
      throw error;
    });
    yield put({ type: "FETCH_RAISER_DOGS" });
  } catch (error) {
    console.log('add dog failed', error);
  }
}

// worker Saga: will be fired on "FETCH_DOG_PROFILE" actions
function* fetchDog() {
  try {
    const dogResponse = yield axios.get('/api/dog').catch(error => {
      console.error("Error in fetchDog:", error);
      throw error;
    });
    yield put({ type: 'SET_DOG_PROFILE', payload: dogResponse.data });
  } catch (error) {
    console.log('dog get request failed', error);
  }
}

function* updateDog(action) {
  try {
    const { dogId, updates } = action.payload;
    yield axios.patch(`/api/dog/${dogId}`, updates).catch(error => {
      console.error("Error in updateDog:", error);
      throw error;
    });
    yield put({ type: 'FETCH_DOG_PROFILE' });
  } catch (err) {
    console.log('Error updating dog in saga:', err);
  }
}

function* dogSaga() {
  yield takeLatest('FETCH_DOG_PROFILE', fetchDog);
  yield takeLatest("FETCH_USER_DOGS", fetchRaiserDogs);
  yield takeLatest('UPDATE_DOG_PROFILE', updateDog);
  yield takeLatest('SET_USER_DOGS', fetchDog);
  yield takeLatest('POST_DOG', addDog);
}

export default dogSaga;
