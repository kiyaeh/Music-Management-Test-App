import { createSlice } from '@reduxjs/toolkit';

// Generate unique ID for toasts
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Initial state
const initialState = {
  toasts: []
};

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Toaster slice
const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const { type, message, title, duration = 4000 } = action.payload;
      const id = generateId();
      
      const toast = {
        id,
        type,
        title,
        message,
        duration,
        timestamp: Date.now()
      };
      
      state.toasts.push(toast);
    },
    
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    
    clearAllToasts: (state) => {
      state.toasts = [];
    },
    
    // Helper action creators for common use cases
    showSuccessToast: (state, action) => {
      const { message, title = 'Success!' } = action.payload;
      const id = generateId();
      
      state.toasts.push({
        id,
        type: TOAST_TYPES.SUCCESS,
        title,
        message,
        duration: 4000,
        timestamp: Date.now()
      });
    },
    
    showErrorToast: (state, action) => {
      const { message, title = 'Error!' } = action.payload;
      const id = generateId();
      
      state.toasts.push({
        id,
        type: TOAST_TYPES.ERROR,
        title,
        message,
        duration: 6000, // Error toasts stay longer
        timestamp: Date.now()
      });
    },
    
    showWarningToast: (state, action) => {
      const { message, title = 'Warning!' } = action.payload;
      const id = generateId();
      
      state.toasts.push({
        id,
        type: TOAST_TYPES.WARNING,
        title,
        message,
        duration: 5000,
        timestamp: Date.now()
      });
    },
    
    showInfoToast: (state, action) => {
      const { message, title = 'Info' } = action.payload;
      const id = generateId();
      
      state.toasts.push({
        id,
        type: TOAST_TYPES.INFO,
        title,
        message,
        duration: 4000,
        timestamp: Date.now()
      });
    }
  }
});

// Action creators
export const {
  addToast,
  removeToast,
  clearAllToasts,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast
} = toasterSlice.actions;

// Selectors
export const selectToasts = (state) => state.toaster.toasts;

export default toasterSlice.reducer;
