import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchDogs() {
  try {
    const response = yield axios.get("/api/raiser-dog");
    yield put({ type: "SET_USER_DOGS", payload: response.data });
  } catch (error) {
    console.log("Lost dogs!", error);
  }
}
function* dogSaga() {
  yield takeLatest("FETCH_USER_DOGS", fetchDogs);
}

export default dogSaga;
