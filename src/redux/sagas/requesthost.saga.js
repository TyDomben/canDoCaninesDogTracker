import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* requestHostSaga(action){
    try{
        const requestHost = yield axios.post(`api/sitter/${dogId}`, action.payload)
        yield put({ type: 'REQUEST_HOST', payload: requestHost.data });
        yield put({ type: 'FETCH_ONE_DOG_PROFILE' });
    } catch (error) {
        console.log('request host saga failed', error);
    }
}

function* requestHostForCareSaga(){
    yield takeLatest('FETCH_REQUEST_HOST', requestHostSaga)
}

export default requestHostForCareSaga;