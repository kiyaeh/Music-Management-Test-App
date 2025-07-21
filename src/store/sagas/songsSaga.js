import { call, put, takeEvery, select } from 'redux-saga/effects';
import { 
  fetchSongsStart, fetchSongsSuccess, fetchSongsFailure,
  createSongStart, createSongSuccess, createSongFailure,
  updateSongStart, updateSongSuccess, updateSongFailure,
  deleteSongStart, deleteSongSuccess, deleteSongFailure,
  selectCurrentPage
} from '../slices/songsSlice';
import { songsAPI } from '../../services/songsAPI';

// Worker Sagas
function* fetchSongsSaga() {
  try {
    const currentPage = yield select(selectCurrentPage);
    console.log('Fetching songs for page:', currentPage);
    const response = yield call(songsAPI.fetchSongs, currentPage);
    console.log('Songs fetched:', response);
    yield put(fetchSongsSuccess(response));
  } catch (error) {
    console.error('Error fetching songs:', error);
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSongSaga(action) {
  try {
    console.log('Creating song:', action.payload);
    const newSong = yield call(songsAPI.createSong, action.payload);
    console.log('Song created:', newSong);
    yield put(createSongSuccess(newSong));
    // Refresh the song list after creating
    yield put(fetchSongsStart());
  } catch (error) {
    console.error('Error creating song:', error);
    yield put(createSongFailure(error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const updatedSong = yield call(songsAPI.updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(updatedSong));
    // Refresh the song list after updating
    yield put(fetchSongsStart());
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(songsAPI.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    // Refresh the song list after deleting
    yield put(fetchSongsStart());
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

// Watcher Saga
export default function* songsSaga() {
  yield takeEvery(fetchSongsStart.type, fetchSongsSaga);
  yield takeEvery(createSongStart.type, createSongSaga);
  yield takeEvery(updateSongStart.type, updateSongSaga);
  yield takeEvery(deleteSongStart.type, deleteSongSaga);
}
