import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import dogSaga from './dog.saga';
import oneDogSaga from './fetchonedog.saga';
import deleteDogSaga from './deletedog.saga';
import requestHostSaga from './requesthost.saga';
import volunteerHostSaga from './volunteerhost.saga';
import requestsSaga from './admin.saga';
import mailSaga from './mail.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    dogSaga(),
    oneDogSaga(),
    deleteDogSaga(),
    requestHostSaga(),
    volunteerHostSaga(),
    requestsSaga(),
    mailSaga()

  ]);
}
