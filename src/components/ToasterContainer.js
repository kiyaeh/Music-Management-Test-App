import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectToasts } from '@store/slices/toasterSlice';
import Toast from './Toast';

const ToasterWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  
  & > * {
    pointer-events: all;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    top: 16px;
    right: 16px;
    left: 16px;
    align-items: center;
  }
`;

const ToasterContainer = () => {
  const toasts = useSelector(selectToasts);

  if (!toasts || toasts.length === 0) {
    return null;
  }

  // Sort toasts by timestamp (newest first)
  const sortedToasts = [...toasts].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <ToasterWrapper>
      {sortedToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </ToasterWrapper>
  );
};

export default ToasterContainer;
