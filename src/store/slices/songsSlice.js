import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  songs: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  totalSongs: 0,
  selectedSong: null,
  isModalOpen: false,
  modalMode: 'create' // 'create', 'edit', 'view'
};

// Songs slice
const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Loading states
    fetchSongsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload.songs;
      state.totalSongs = action.payload.total;
      state.totalPages = Math.ceil(action.payload.total / state.itemsPerPage);
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create song
    createSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action) => {
      state.loading = false;
      state.isModalOpen = false;
      // Song list will be refreshed by fetchSongsStart in saga
    },
    createSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update song
    updateSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      state.isModalOpen = false;
      state.selectedSong = null;
      // Song list will be refreshed by fetchSongsStart in saga
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete song
    deleteSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      // Song list will be refreshed by fetchSongsStart in saga
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Modal management
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalMode = action.payload.mode;
      state.selectedSong = action.payload.song || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedSong = null;
      state.modalMode = 'create';
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Action creators
export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  setCurrentPage,
  openModal,
  closeModal,
  clearError
} = songsSlice.actions;

// Selectors
export const selectSongs = (state) => state.songs.songs;
export const selectLoading = (state) => state.songs.loading;
export const selectError = (state) => state.songs.error;
export const selectCurrentPage = (state) => state.songs.currentPage;
export const selectTotalPages = (state) => state.songs.totalPages;
export const selectTotalSongs = (state) => state.songs.totalSongs;
export const selectSelectedSong = (state) => state.songs.selectedSong;
export const selectIsModalOpen = (state) => state.songs.isModalOpen;
export const selectModalMode = (state) => state.songs.modalMode;

export default songsSlice.reducer;
