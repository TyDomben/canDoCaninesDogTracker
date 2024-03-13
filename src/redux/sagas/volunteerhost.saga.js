import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* volunteerToHost(action){
    try{
        const { requestId, formData } = action.payload

        console.log("hostId:", formData)

        const response = yield axios.post(`api/sitter/volunteer/${requestId}`, formData)
        yield put({ type: 'VOLUNTEER_HOST_SUCCESS', payload: response.data });
        console.log("response", response.data)
    } catch (error) {
        console.log('request host saga failed', error);
        yield put({ type: 'VOLUNTEER_HOST_FAILURE', error: error.message });
     }
}

function* volunteerHostSaga(){
    yield takeLatest('VOLUNTEER_TO_HOST', volunteerToHost)
}

export default volunteerHostSaga;