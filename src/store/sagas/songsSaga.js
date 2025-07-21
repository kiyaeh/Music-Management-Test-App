import { call, put, takeEvery, select } from 'redux-saga/effects';
import { 
  fetchSongsStart, fetchSongsSuccess, fetchSongsFailure,
  createSongStart, createSongSuccess, createSongFailure,
  updateSongStart, updateSongSuccess, updateSongFailure,
  deleteSongStart, deleteSongSuccess, deleteSongFailure,
  selectCurrentPage
} from '../slices/songsSlice';
import { showSuccessToast, showErrorToast } from '../slices/toasterSlice';
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
    
    // Show success toast
    yield put(showSuccessToast({
      title: 'Song Added!',
      message: `"${action.payload.title}" by ${action.payload.artist} has been added to your collection.`
    }));
    
    // Refresh the song list after creating
    yield put(fetchSongsStart());
  } catch (error) {
    console.error('Error creating song:', error);
    yield put(createSongFailure(error.message));
    
    // Show error toast
    yield put(showErrorToast({
      title: 'Failed to Add Song',
      message: error.message || 'Unable to add the song. Please try again.'
    }));
  }
}

function* updateSongSaga(action) {
  try {
    const updatedSong = yield call(songsAPI.updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(updatedSong));
    
    // Show success toast
    yield put(showSuccessToast({
      title: 'Song Updated!',
      message: `"${action.payload.data.title}" has been successfully updated.`
    }));
    
    // Refresh the song list after updating
    yield put(fetchSongsStart());
  } catch (error) {
    yield put(updateSongFailure(error.message));
    
    // Show error toast
    yield put(showErrorToast({
      title: 'Failed to Update Song',
      message: error.message || 'Unable to update the song. Please try again.'
    }));
  }
}

function* deleteSongSaga(action) {
  try {
    const { id, song } = action.payload;
    yield call(songsAPI.deleteSong, id);
    yield put(deleteSongSuccess(id));
    
    // Show success toast with song details
    yield put(showSuccessToast({
      title: 'Song Deleted!',
      message: `"${song.title}" by ${song.artist} has been removed from your collection.`
    }));
    
    // Refresh the song list after deleting
    yield put(fetchSongsStart());
  } catch (error) {
    yield put(deleteSongFailure(error.message));
    
    // Show error toast
    yield put(showErrorToast({
      title: 'Failed to Delete Song',
      message: error.message || 'Unable to delete the song. Please try again.'
    }));
  }
}

// Watcher Saga
export default function* songsSaga() {
  yield takeEvery(fetchSongsStart.type, fetchSongsSaga);
  yield takeEvery(createSongStart.type, createSongSaga);
  yield takeEvery(updateSongStart.type, updateSongSaga);
  yield takeEvery(deleteSongStart.type, deleteSongSaga);
}
