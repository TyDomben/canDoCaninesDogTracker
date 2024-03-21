import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* confirmEmail() {
    console.log('in confirmEmail')
    // try {
    //     yield axios.post('/api/mail/confirmation')
    // }
    // catch (err) {
    //     console.log('err in confirmEmail mail saga')
    // }
}

function* denialEmail() {
    try {
        yield axios.post('/api/mail/denial')
    }
    catch (err) {
        console.log('error in denialEmail in mail saga')
    }
}

function* requestEmail() {
    try {
        yield axios.post('/api/mail/request')
    }
    catch (err) {
        console.log('error in requestEmail in mail saga')
    }
}

function* mailSaga() {
    yield takeLatest ('EMAIL_CONFIRMATION', confirmEmail),
    yield takeLatest ('EMAIL_DENIAL', denialEmail),
    yield takeLatest ('REQUEST_EMAIL', requestEmail)
}

export default mailSaga;