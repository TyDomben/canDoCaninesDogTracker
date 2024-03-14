import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

function* fetchRequests(action) {
  try {
    const response = yield axios.get("/api/admin");
    yield put({ type: "SET_REQUESTS", payload: response.data });
  } catch (error) {
    console.log("fetching requests failed", error);
  }
}

function* confirmRequest(action) {
  try {
    yield call(axios.put, `/api/admin/${action.payload}`, {
      status: "Confirmed",
    });
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("dog get request failed", error);
  }
}

function* denyRequest(action) {
  try {
    yield call(axios.put, `/api/admin/${action.payload}`, {
      status: "Denied",
    });
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("dog get request failed", error);
  }
}

function* requestsSaga() {
  yield takeLatest("FETCH_REQUESTS", fetchRequests);
  yield takeLatest("SET_CONFIRMATION", confirmRequest);
  yield takeLatest("DENY_CONFIRMATION", denyRequest);
}

export default requestsSaga;
