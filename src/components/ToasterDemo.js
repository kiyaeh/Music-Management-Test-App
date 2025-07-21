import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { 
  showSuccessToast, 
  showErrorToast, 
  showWarningToast, 
  showInfoToast 
} from '@store/slices/toasterSlice';

const ToasterDemo = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  z-index: 1000;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: 16px;
    left: 16px;
  }
`;

const DemoButton = styled.button`
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.colors.primary[500]};
  background: rgba(249, 115, 22, 0.1);
  color: ${props => props.theme.colors.primary[400]};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primary[500]};
    color: ${props => props.theme.colors.neutral[0]};
  }
`;

const ToasterDemoComponent = () => {
  const dispatch = useDispatch();

  const showSuccess = () => {
    dispatch(showSuccessToast({
      title: 'Song Added!',
      message: '"Bohemian Rhapsody" by Queen has been added to your collection.'
    }));
  };

  const showError = () => {
    dispatch(showErrorToast({
      title: 'Failed to Add Song',
      message: 'Unable to add the song. Please try again.'
    }));
  };

  const showWarning = () => {
    dispatch(showWarningToast({
      title: 'Warning!',
      message: 'This action cannot be undone.'
    }));
  };

  const showInfo = () => {
    dispatch(showInfoToast({
      title: 'Info',
      message: 'Your music library is now synced.'
    }));
  };

  return (
    <ToasterDemo>
      <DemoButton onClick={showSuccess}>Success Toast</DemoButton>
      <DemoButton onClick={showError}>Error Toast</DemoButton>
      <DemoButton onClick={showWarning}>Warning Toast</DemoButton>
      <DemoButton onClick={showInfo}>Info Toast</DemoButton>
    </ToasterDemo>
  );
};

export default ToasterDemoComponent;
