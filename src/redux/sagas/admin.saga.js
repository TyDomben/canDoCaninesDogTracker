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
  console.log('action.payload', action.payload.volunteer_id)
  try {
    yield call(axios.put, `/api/admin/${action.payload.request_id}`, {
      status: "confirmed",
      confirmed_volunteer_id:  action.payload.volunteer_user_id
    });
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("dog get request failed", error);
  }
}

function* denyRequest(action) {
  try {
    yield call(axios.put, `/api/admin/${action.payload}`, {
      status: "denied",
    });
    yield put({ type: "FETCH_REQUESTS" });
  } catch (error) {
    console.log("dog get request failed", error);
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

  function* removeAdmin(action) {
    try {
      yield call(axios.put, `/api/admin-profile/${action.payload}`, {
        status: false,
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
  yield takeLatest("REMOVE_ADMIN", removeAdmin);

}

export default requestsSaga;
