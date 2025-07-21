import React from 'react';
import styled from '@emotion/styled';

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.space['4xl']};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space['2xl']};
  }
`;

const SpinnerWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: ${props => props.theme.space.xl};
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(249, 115, 22, 0.2);
  border-top: 4px solid ${props => props.theme.colors.primary[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(245, 158, 11, 0.3);
    border-top: 3px solid ${props => props.theme.colors.secondary[500]};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin-reverse 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes spin-reverse {
    0% { transform: translate(-50%, -50%) rotate(360deg); }
    100% { transform: translate(-50%, -50%) rotate(0deg); }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    border-width: 3px;

    &::after {
      width: 32px;
      height: 32px;
      border-width: 2px;
    }
  }
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.neutral[300]};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin: 0 0 ${props => props.theme.space.sm} 0;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.md};
  }
`;

const SubText = styled.p`
  color: ${props => props.theme.colors.neutral[400]};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: 0;
  opacity: 0.8;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xs};
  }
`;

const LoadingSpinner = ({ 
  text = 'Loading your music...', 
  subText = 'This might take a moment' 
}) => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
      <LoadingText>{text}</LoadingText>
      <SubText>{subText}</SubText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
