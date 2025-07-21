import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { openModal, deleteSongStart } from '@store/slices/songsSlice';

const ListContainer = styled.div`
  margin-bottom: ${props => props.theme.space.xl};
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.space.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space.sm};
  }
`;

const SongCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.space.lg};
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
    transition: left ${props => props.theme.transitions.slow};
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.theme.colors.primary[400]};
    box-shadow: ${props => props.theme.shadows.glow};
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.md};
    border-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.space.md};
  position: relative;
  z-index: 2;
`;

const SongInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SongTitle = styled.h3`
  margin: 0 0 ${props => props.theme.space.sm} 0;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.neutral[0]};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.lg};
    white-space: normal;
    line-height: 1.4;
  }
`;

const ArtistName = styled.p`
  margin: 0 0 ${props => props.theme.space.xs} 0;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary[400]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.md};
    white-space: normal;
  }
`;

const SongDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${props => props.theme.space.sm};
  margin-bottom: ${props => props.theme.space.lg};
  position: relative;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.space.xs};
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.xs};
`;

const DetailIcon = styled.span`
  font-size: 1rem;
  opacity: 0.8;
`;

const DetailLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.neutral[400]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const DetailValue = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.neutral[200]};
  font-weight: ${props => props.theme.fontWeights.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    white-space: normal;
    line-height: 1.3;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  position: relative;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border: 1px solid;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.xs};
  min-height: 40px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.md};
  }
`;

const EditButton = styled(ActionButton)`
  background: rgba(249, 115, 22, 0.1);
  color: ${props => props.theme.colors.primary[400]};
  border-color: ${props => props.theme.colors.primary[500]};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary[500]};
    color: ${props => props.theme.colors.neutral[0]};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(239, 68, 68, 0.1);
  color: ${props => props.theme.colors.error[400]};
  border-color: ${props => props.theme.colors.error[500]};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.error[500]};
    color: ${props => props.theme.colors.neutral[0]};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.space['5xl']} ${props => props.theme.space.lg};
  color: ${props => props.theme.colors.neutral[400]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space['3xl']} ${props => props.theme.space.md};
  }
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.space.lg};
  opacity: 0.6;
  animation: pulse 2s infinite;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 3rem;
  }
`;

const EmptyTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.space.md};
  color: ${props => props.theme.colors.neutral[300]};
  font-weight: ${props => props.theme.fontWeights.semibold};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const EmptyText = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  margin: 0;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const GenreTag = styled.span`
  background: linear-gradient(135deg, ${props => props.theme.colors.secondary[500]}, ${props => props.theme.colors.secondary[600]});
  color: ${props => props.theme.colors.neutral[0]};
  padding: ${props => props.theme.space.xs} ${props => props.theme.space.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-top: ${props => props.theme.space.xs};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.space.xs};
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SongList = ({ songs, loading }) => {
  const dispatch = useDispatch();

  const handleEdit = (song, e) => {
    e.stopPropagation();
    dispatch(openModal({ mode: 'edit', song }));
  };

  const handleDelete = (song, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${song.title}" by ${song.artist}?`)) {
      dispatch(deleteSongStart({ id: song.id, song: song }));
    }
  };

  if (songs.length === 0 && !loading) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyIcon>🎵</EmptyIcon>
          <EmptyTitle>No songs in your collection</EmptyTitle>
          <EmptyText>
            Start building your music library by adding your first song. 
            Click the "Add New Song" button to get started!
          </EmptyText>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <SongGrid>
        {songs.map(song => (
          <SongCard key={song.id}>
            <CardHeader>
              <SongInfo>
                <SongTitle>{song.title}</SongTitle>
                <ArtistName>{song.artist}</ArtistName>
              </SongInfo>
            </CardHeader>
            
            <SongDetails>
              <DetailItem>
                <DetailIcon>💿</DetailIcon>
                <DetailLabel>Album</DetailLabel>
                <DetailValue>{song.album}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailIcon>📅</DetailIcon>
                <DetailLabel>Year</DetailLabel>
                <DetailValue>{song.year}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailIcon>⏱️</DetailIcon>
                <DetailLabel>Duration</DetailLabel>
                <DetailValue>{formatDuration(song.duration)}</DetailValue>
              </DetailItem>
            </SongDetails>

            <GenreTag>{song.genre}</GenreTag>
            
            <ActionButtons>
              <EditButton 
                onClick={(e) => handleEdit(song, e)}
                disabled={loading}
                title="Edit song"
              >
                ✏️ Edit
              </EditButton>
              <DeleteButton 
                onClick={(e) => handleDelete(song, e)}
                disabled={loading}
                title="Delete song"
              >
                🗑️ Delete
              </DeleteButton>
            </ActionButtons>
          </SongCard>
        ))}
      </SongGrid>
    </ListContainer>
  );
};

export default SongList;
