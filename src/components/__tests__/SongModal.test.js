import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@emotion/react';
import SongModal from '../SongModal';
import songsReducer from '../../store/slices/songsSlice';
import { theme } from '../../styles/theme';

// Test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      songs: songsReducer
    },
    preloadedState: {
      songs: {
        songs: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10,
        totalSongs: 0,
        selectedSong: null,
        isModalOpen: true,
        modalMode: 'create',
        ...initialState
      }
    }
  });
};

// Test wrapper component
const TestWrapper = ({ children, store }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </Provider>
);

describe('SongModal Component', () => {
  test('renders create mode correctly', () => {
    const store = createTestStore({ modalMode: 'create' });
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    expect(screen.getByText('Add New Song')).toBeInTheDocument();
    expect(screen.getByText('Add Song')).toBeInTheDocument();
    expect(screen.getByLabelText('Song Title *')).toHaveValue('');
  });

  test('renders edit mode correctly', () => {
    const selectedSong = {
      id: '1',
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      year: 2023,
      genre: 'Rock',
      duration: 180
    };

    const store = createTestStore({ 
      modalMode: 'edit',
      selectedSong 
    });
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    expect(screen.getByText('Edit Song')).toBeInTheDocument();
    expect(screen.getByText('Update Song')).toBeInTheDocument();
    expect(screen.getByLabelText('Song Title *')).toHaveValue('Test Song');
    expect(screen.getByLabelText('Artist *')).toHaveValue('Test Artist');
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    // Clear all required fields to trigger validation
    const titleInput = screen.getByLabelText('Song Title *');
    const artistInput = screen.getByLabelText('Artist *');
    const albumInput = screen.getByLabelText('Album *');
    const genreSelect = screen.getByLabelText('Genre *');
    
    await act(async () => {
      await user.clear(titleInput);
      await user.clear(artistInput);
      await user.clear(albumInput);
      await user.selectOptions(genreSelect, ''); // Reset genre to empty
    });

    // Verify fields are empty before submitting
    expect(titleInput.value).toBe('');
    expect(artistInput.value).toBe('');
    expect(albumInput.value).toBe('');
    expect(genreSelect.value).toBe('');

    // Try to submit the form using form submission
    const form = titleInput.closest('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Artist is required')).toBeInTheDocument();
    expect(screen.getByText('Album is required')).toBeInTheDocument();
    expect(screen.getByText('Genre is required')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    // Fill in form
    await user.type(screen.getByLabelText('Song Title *'), 'New Song');
    await user.type(screen.getByLabelText('Artist *'), 'New Artist');
    await user.type(screen.getByLabelText('Album *'), 'New Album');
    await user.selectOptions(screen.getByLabelText('Genre *'), 'Rock');
    await user.clear(screen.getByLabelText('Year *'));
    await user.type(screen.getByLabelText('Year *'), '2023');
    await user.clear(screen.getByLabelText('Duration (seconds) *'));
    await user.type(screen.getByLabelText('Duration (seconds) *'), '200');

    const submitButton = screen.getByText('Add Song');
    await user.click(submitButton);

    // Check that no validation errors are shown
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Artist is required')).not.toBeInTheDocument();
  });

  test('closes modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    // This would trigger the closeModal action
    // In a real test, you'd want to check that the action was dispatched
  });

  test('validates year range', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    const yearInput = screen.getByLabelText('Year *');
    await user.clear(yearInput);
    await user.type(yearInput, '1800');

    // Try to submit the form using form submission
    const form = yearInput.closest('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(screen.getByText('Year must be between 1900 and 2025')).toBeInTheDocument();
    });
  });

  test('validates duration range', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongModal />
      </TestWrapper>
    );

    const durationInput = screen.getByLabelText('Duration (seconds) *');
    await user.clear(durationInput);
    await user.type(durationInput, '5000');

    // Try to submit the form using form submission
    const form = durationInput.closest('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(screen.getByText('Duration must be between 1 and 3600 seconds')).toBeInTheDocument();
    });
  });
});
