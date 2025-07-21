import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { 
  fetchSongsStart, 
  setCurrentPage,
  openModal,
  selectSongs,
  selectLoading,
  selectError,
  selectCurrentPage,
  selectTotalPages,
  selectIsModalOpen
} from '@store/slices/songsSlice';
import Header from './Header';
import SongList from './SongList';
import Pagination from './Pagination';
import SongModal from './SongModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.primary};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at bottom, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.space.xl};
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 140px);

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.space.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.space.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.sm};
    min-height: calc(100vh - 120px);
  }
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: ${props => props.theme.shadows['2xl']};
  padding: ${props => props.theme.space['2xl']};
  margin-top: ${props => props.theme.space.xl};
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.primary[500]}, transparent);
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.space.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.space.lg};
    border-radius: ${props => props.theme.borderRadius.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.md};
    margin-top: ${props => props.theme.space.lg};
    border-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.space.xl};
  padding: ${props => props.theme.space.lg};
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid rgba(249, 115, 22, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.space.sm};
    text-align: center;
    padding: ${props => props.theme.space.md};
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.xs};
`;

const StatValue = styled.span`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[400]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const StatLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.neutral[300]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ErrorContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SongManager = () => {
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isModalOpen = useSelector(selectIsModalOpen);

  // Fetch songs on component mount and page change
  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleCreateSong = () => {
    dispatch(openModal({ mode: 'create' }));
  };

  const totalSongs = songs.length;

  if (error) {
    return (
      <Container>
        <Header onCreateSong={handleCreateSong} />
        <Main>
          <ErrorContainer>
            <ErrorMessage message={error} />
          </ErrorContainer>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      <Header onCreateSong={handleCreateSong} />
      <Main>
        <ContentWrapper>
          <StatsBar>
            <StatItem>
              <StatValue>{totalSongs}</StatValue>
              <StatLabel>Total Songs</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{currentPage}</StatValue>
              <StatLabel>Current Page</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{totalPages}</StatValue>
              <StatLabel>Total Pages</StatLabel>
            </StatItem>
          </StatsBar>

          {loading && songs.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <>
              <SongList songs={songs} loading={loading} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </ContentWrapper>
      </Main>
      {isModalOpen && <SongModal />}
    </Container>
  );
};

export default SongManager;
