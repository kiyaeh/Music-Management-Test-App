import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@emotion/react';
import SongList from '../SongList';
import songsReducer from '../../store/slices/songsSlice';
import { theme } from '../../styles/theme';

// Mock data
const mockSongs = [
  {
    id: '1',
    title: 'Test Song 1',
    artist: 'Test Artist 1',
    album: 'Test Album 1',
    year: 2023,
    genre: 'Rock',
    duration: 180
  },
  {
    id: '2',
    title: 'Test Song 2',
    artist: 'Test Artist 2',
    album: 'Test Album 2',
    year: 2022,
    genre: 'Pop',
    duration: 210
  }
];

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
        isModalOpen: false,
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

describe('SongList Component', () => {
  beforeEach(() => {
    global.confirm = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no songs', () => {
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongList songs={[]} loading={false} />
      </TestWrapper>
    );

    expect(screen.getByText('No songs in your collection')).toBeInTheDocument();
    expect(screen.getByText('Start building your music library by adding your first song. Click the "Add New Song" button to get started!')).toBeInTheDocument();
  });

  test('renders song list with songs', () => {
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongList songs={mockSongs} loading={false} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Song 1')).toBeInTheDocument();
    expect(screen.getByText('Test Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Test Album 1')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Rock')).toBeInTheDocument();
  });

  test('formats duration correctly', () => {
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongList songs={mockSongs} loading={false} />
      </TestWrapper>
    );

    expect(screen.getByText('3:00')).toBeInTheDocument(); // 180 seconds
    expect(screen.getByText('3:30')).toBeInTheDocument(); // 210 seconds
  });

  test('shows edit and delete buttons for each song', () => {
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongList songs={mockSongs} loading={false} />
      </TestWrapper>
    );

    const editButtons = screen.getAllByText(/Edit/);
    const deleteButtons = screen.getAllByText(/Delete/);

    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  test('calls confirm when delete button is clicked', () => {
    global.confirm.mockReturnValue(true);
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongList songs={mockSongs} loading={false} />
      </TestWrapper>
    );

    const deleteButtons = screen.getAllByText(/Delete/);
    fireEvent.click(deleteButtons[0]);

    expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete "Test Song 1" by Test Artist 1?');
  });

  test('disables buttons when loading', () => {
    const store = createTestStore();
    
    render(
      <TestWrapper store={store}>
        <SongList songs={mockSongs} loading={true} />
      </TestWrapper>
    );

    const editButtons = screen.getAllByText(/Edit/);
    const deleteButtons = screen.getAllByText(/Delete/);

    editButtons.forEach(button => {
      expect(button).toBeDisabled();
    });

    deleteButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
