import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* requestHost(action){
    try{
        const { dogId, formData } = action.payload

        console.log("requestId:", formData)

        const response = yield axios.post(`api/sitter/request/${dogId}`, formData)
        yield put({ type: 'REQUEST_HOST_SUCCESS', payload: response.data });
        console.log("response", response.data)
    } catch (error) {
        console.log('request host saga failed', error);
    //     yield put({ type: 'REQUEST_HOST_FAILURE', error: error.message });
     }
}

function* requestHostSaga(){
    yield takeLatest('REQUEST_HOST', requestHost)
}

export default requestHostSaga;