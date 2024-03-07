import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "REMOVE_DOG_PROFILE" actions
function* deleteDog(action) {
    try {
    //get the cats:
    yield call(axios.delete(`/api/dog/${action.dogId}`))
      yield put({ type: 'SET_DOG_PROFILE'});
    } catch (error) {
      console.log('dog get request failed', error);
    }
  }

function* deleteDogSaga(){
    yield takeLatest('REMOVE_DOG_PROFILE', deleteDog)
  }

export default deleteDogSaga;
