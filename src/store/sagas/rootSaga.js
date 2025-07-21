import { all } from 'redux-saga/effects';
import songsSaga from './songsSaga';

// Root saga that combines all sagas
export default function* rootSaga() {
  yield all([
    songsSaga()
  ]);
}
