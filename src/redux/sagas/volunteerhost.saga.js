import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* volunteerHost(action){
    try{
        const { hostingId, formData } = action.payload

        console.log("hostingId:", formData)

        const response = yield axios.post(`api/sitter/${hostingId}`, formData)
        yield put({ type: 'VOLUNTEER_HOST_SUCCESS', payload: response.data });
        console.log("response", response.data)
    } catch (error) {
        console.log('request host saga failed', error);
        yield put({ type: 'VOLUNTEER_HOST_FAILURE', error: error.message });
     }
}

function* volunteerHostSaga(){
    yield takeLatest('VOLUNTEER_TO_HOST', volunteerHost)
}

export default volunteerHostSaga;