import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { 
  closeModal, 
  createSongStart, 
  updateSongStart,
  selectModalMode,
  selectSelectedSong,
  selectLoading,
  selectError,
  clearError
} from '@store/slices/songsSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.space.lg};
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.neutral[900]};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: ${props => props.theme.space.xs};
  color: ${props => props.theme.colors.neutral[500]};

  &:hover {
    color: ${props => props.theme.colors.neutral[700]};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
`;

const Label = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.neutral[700]};
`;

const Input = styled.input`
  padding: ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }

  &:invalid {
    border-color: ${props => props.theme.colors.error[500]};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.space.md};
  justify-content: flex-end;
  margin-top: ${props => props.theme.space.lg};
`;

const Button = styled.button`
  padding: ${props => props.theme.space.md} ${props => props.theme.space.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary[500]};
  color: white;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary[600]};
  }
`;

const SecondaryButton = styled(Button)`
  background: ${props => props.theme.colors.neutral[200]};
  color: ${props => props.theme.colors.neutral[700]};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.neutral[300]};
  }
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.error[500]};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: ${props => props.theme.space.sm} 0;
`;

const SongModal = () => {
  const dispatch = useDispatch();
  const modalMode = useSelector(selectModalMode);
  const selectedSong = useSelector(selectSelectedSong);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: '',
    duration: 180
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (modalMode === 'edit' && selectedSong) {
      setFormData({
        title: selectedSong.title || '',
        artist: selectedSong.artist || '',
        album: selectedSong.album || '',
        year: selectedSong.year || new Date().getFullYear(),
        genre: selectedSong.genre || '',
        duration: selectedSong.duration || 180
      });
    } else {
      setFormData({
        title: '',
        artist: '',
        album: '',
        year: new Date().getFullYear(),
        genre: '',
        duration: 180
      });
    }
  }, [modalMode, selectedSong]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!formData.album.trim()) {
      newErrors.album = 'Album is required';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    const currentYear = new Date().getFullYear();
    if (formData.year < 1900 || formData.year > currentYear) {
      newErrors.year = `Year must be between 1900 and ${currentYear}`;
    }

    if (formData.duration < 1 || formData.duration > 3600) {
      newErrors.duration = 'Duration must be between 1 and 3600 seconds';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const songData = {
      ...formData,
      year: parseInt(formData.year),
      duration: parseInt(formData.duration)
    };

    if (modalMode === 'edit') {
      dispatch(updateSongStart({ id: selectedSong.id, data: songData }));
    } else {
      dispatch(createSongStart(songData));
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const genres = ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Electronic', 'Folk', 'Classical', 'R&B', 'Country', 'Reggae', 'Blues', 'Funk', 'Metal', 'Punk', 'Alternative'];

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {modalMode === 'edit' ? 'Edit Song' : 'Add New Song'}
          </ModalTitle>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>

        {error && <ErrorText>{error}</ErrorText>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Song Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="artist">Artist *</Label>
            <Input
              id="artist"
              name="artist"
              type="text"
              value={formData.artist}
              onChange={handleInputChange}
              required
            />
            {errors.artist && <ErrorText>{errors.artist}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="album">Album *</Label>
            <Input
              id="album"
              name="album"
              type="text"
              value={formData.album}
              onChange={handleInputChange}
              required
            />
            {errors.album && <ErrorText>{errors.album}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="genre">Genre *</Label>
            <Select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </Select>
            {errors.genre && <ErrorText>{errors.genre}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.year}
              onChange={handleInputChange}
              required
            />
            {errors.year && <ErrorText>{errors.year}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="duration">Duration (seconds) *</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              max="3600"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
            {errors.duration && <ErrorText>{errors.duration}</ErrorText>}
          </FormGroup>

          <ButtonGroup>
            <SecondaryButton type="button" onClick={handleClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Saving...' : (modalMode === 'edit' ? 'Update Song' : 'Add Song')}
            </PrimaryButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SongModal;
