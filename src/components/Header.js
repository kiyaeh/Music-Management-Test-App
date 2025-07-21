import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${props => props.theme.colors.background.primary} 0%, ${props => props.theme.colors.background.secondary} 100%);
  color: ${props => props.theme.colors.neutral[0]};
  padding: ${props => props.theme.space.lg} 0;
  border-bottom: 2px solid ${props => props.theme.colors.primary[500]};
  box-shadow: ${props => props.theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.md} 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${props => props.theme.space.lg};
  gap: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.space.md};
    flex-direction: column;
    text-align: center;
    gap: ${props => props.theme.space.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0 ${props => props.theme.space.sm};
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.space.sm};
  }
`;

const MusicIcon = styled.div`
  font-size: 2.5rem;
  animation: bounce 2s infinite;
  filter: drop-shadow(0 0 10px ${props => props.theme.colors.primary[500]});

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.xs};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  margin: 0;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary[400]}, ${props => props.theme.colors.secondary[400]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(249, 115, 22, 0.3);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.neutral[300]};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin: 0;
  opacity: 0.8;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xs};
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]} 0%, ${props => props.theme.colors.primary[600]} 100%);
  color: ${props => props.theme.colors.neutral[0]};
  border: 2px solid transparent;
  padding: ${props => props.theme.space.md} ${props => props.theme.space.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  min-width: 160px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${props => props.theme.transitions.slow};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
    border-color: ${props => props.theme.colors.primary[300]};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.3);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
    font-size: ${props => props.theme.fontSizes.sm};
    min-width: 140px;
    width: 100%;
    max-width: 200px;
  }
`;

const ButtonIcon = styled.span`
  margin-right: ${props => props.theme.space.sm};
  font-size: 1.2em;
  display: inline-block;
  transition: transform ${props => props.theme.transitions.normal};

  ${CreateButton}:hover & {
    transform: rotate(90deg);
  }
`;

const Header = ({ onCreateSong }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleSection>
          <MusicIcon>🎵</MusicIcon>
          <TitleGroup>
            <Title>Addis Music Manager</Title>
            <Subtitle>Manage your music collection with style</Subtitle>
          </TitleGroup>
        </TitleSection>
        
        <CreateButton onClick={onCreateSong}>
          <ButtonIcon>+</ButtonIcon>
          Add New Song
        </CreateButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
