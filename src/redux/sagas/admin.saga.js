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
    const { requestId, hostingId, status } = action.payload;
    const response = yield call(axios.post, `/api/admin/confirm`, { requestId, hostingId, status });
    
    // Update Redux state to reflect the new status
    yield put({ 
      type: "UPDATE_REQUEST_STATUS", 
      payload: { requestId, status } 
    });
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Confirm request failed", error);
  }
}

function* denyRequest(action) {
  try {
    const { requestId, hostingId, status } = action.payload;
    const response = yield call(axios.post, `/api/admin/confirm`, { requestId, hostingId, status });
    
    // Update Redux state to reflect the new status
    yield put({ 
      type: "UPDATE_REQUEST_STATUS", 
      payload: { requestId, status } 
    });


    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("Confirm request failed", error);
  }
}


function* fetchAllUsers(action) {
    try {
      const response = yield axios.get("/api/admin-profile");
      yield put({ type: "SET_USER_ADMIN", payload: response.data });
    } catch (error) {
      console.log("fetching requests failed", error);
    }
  }
  
  function* confirmAdmin(action) {
    try {
      yield call(axios.put, `/api/admin-profile/${action.payload}`, {
        status: true,
      });
      yield put({ type: "FETCH_ALL_USERS" });
    } catch (error) {
      console.log("change user admin failed", error);
    }
  }

function* requestsSaga() {
  yield takeLatest("FETCH_REQUESTS", fetchRequests);
  yield takeLatest("SET_CONFIRMATION", confirmRequest);
  yield takeLatest("DENY_CONFIRMATION", denyRequest);
  yield takeLatest("FETCH_ALL_USERS", fetchAllUsers);
  yield takeLatest("CONFIRM_ADMIN", confirmAdmin);
}

export default requestsSaga;
