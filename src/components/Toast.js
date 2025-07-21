import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { removeToast, TOAST_TYPES } from '@store/slices/toasterSlice';

// Toast icons for different types - using music and warm theme
const TOAST_ICONS = {
  [TOAST_TYPES.SUCCESS]: '�',  // Musical notes for success - more vibrant
  [TOAST_TYPES.ERROR]: '🚫',   // More subtle than ❌ 
  [TOAST_TYPES.WARNING]: '⚠️',
  [TOAST_TYPES.INFO]: '🎵'     // Single musical note for info
};

const ToastContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${props => props.theme.space.lg};
  margin-bottom: ${props => props.theme.space.sm};
  background: ${props => getToastBackground(props.type, props.theme)};
  border: 1px solid ${props => getToastBorder(props.type, props.theme)};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  position: relative;
  min-width: 320px;
  max-width: 400px;
  animation: slideInRight 0.3s ease-out, fadeIn 0.3s ease-out;
  backdrop-filter: blur(10px);
  
  /* Add a subtle gradient overlay for depth */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(249, 115, 22, 0.03) 0%, 
      rgba(245, 158, 11, 0.02) 100%
    );
    border-radius: ${props => props.theme.borderRadius.lg};
    pointer-events: none;
  }
  
  &.toast-exit {
    animation: slideOutRight 0.3s ease-in, fadeOut 0.3s ease-in;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 280px;
    max-width: calc(100vw - 32px);
    padding: ${props => props.theme.space.md};
  }
`;

const ToastIcon = styled.div`
  font-size: 20px;
  margin-right: ${props => props.theme.space.md};
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
  position: relative;
  z-index: 1;
  
  /* Add subtle glow effect for success toasts */
  ${props => props.type === 'success' && `
    filter: drop-shadow(0 0 4px rgba(249, 115, 22, 0.3));
  `}
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

const ToastTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => getToastTextColor(props.type, props.theme)};
  margin-bottom: ${props => props.theme.space.xs};
  line-height: 1.4;
`;

const ToastMessage = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => getToastTextColor(props.type, props.theme, true)};
  line-height: 1.5;
  word-wrap: break-word;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => getToastTextColor(props.type, props.theme, true)};
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: ${props => props.theme.space.xs};
  margin-left: ${props => props.theme.space.sm};
  margin-top: -4px;
  border-radius: ${props => props.theme.borderRadius.sm};
  line-height: 1;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: ${props => getToastTextColor(props.type, props.theme)};
  }
  
  &:focus {
    outline: 2px solid ${props => getToastBorder(props.type, props.theme)};
    outline-offset: 2px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${props => getToastBorder(props.type, props.theme)};
  border-radius: 0 0 ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg};
  animation: progress ${props => props.duration}ms linear;
  opacity: 0.8;
  
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

// Helper functions for toast styling
const getToastBackground = (type, theme) => {
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      return `rgba(249, 115, 22, 0.1)`; // Use primary orange with low opacity
    case TOAST_TYPES.ERROR:
      return `rgba(239, 68, 68, 0.1)`;
    case TOAST_TYPES.WARNING:
      return `rgba(245, 158, 11, 0.1)`;
    case TOAST_TYPES.INFO:
      return `rgba(245, 158, 11, 0.08)`; // Use secondary color for info
    default:
      return 'rgba(255, 255, 255, 0.95)';
  }
};

const getToastBorder = (type, theme) => {
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      return theme.colors.primary[500]; // Use primary orange
    case TOAST_TYPES.ERROR:
      return theme.colors.error[500];
    case TOAST_TYPES.WARNING:
      return theme.colors.warning[500];
    case TOAST_TYPES.INFO:
      return theme.colors.secondary[500]; // Use secondary warm color
    default:
      return theme.colors.neutral[300];
  }
};

const getToastTextColor = (type, theme, isSecondary = false) => {
  const opacity = isSecondary ? 0.8 : 1;
  
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      return `rgba(194, 65, 12, ${opacity})`; // Use darker orange for better contrast
    case TOAST_TYPES.ERROR:
      return `rgba(185, 28, 28, ${opacity})`;
    case TOAST_TYPES.WARNING:
      return `rgba(180, 83, 9, ${opacity})`;
    case TOAST_TYPES.INFO:
      return `rgba(120, 53, 15, ${opacity})`; // Use darker secondary color
    default:
      return `rgba(0, 0, 0, ${opacity})`;
  }
};

const Toast = ({ toast }) => {
  const dispatch = useDispatch();
  const { id, type, title, message, duration } = toast;

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(id));
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [dispatch, id, duration]);

  const handleClose = () => {
    dispatch(removeToast(id));
  };

  return (
    <ToastContainer type={type}>
      <ToastIcon type={type}>{TOAST_ICONS[type]}</ToastIcon>
      <ToastContent>
        <ToastTitle type={type}>{title}</ToastTitle>
        <ToastMessage type={type}>{message}</ToastMessage>
      </ToastContent>
      <CloseButton type={type} onClick={handleClose} aria-label="Close notification">
        ×
      </CloseButton>
      {duration > 0 && <ProgressBar type={type} duration={duration} />}
    </ToastContainer>
  );
};

export default Toast;
