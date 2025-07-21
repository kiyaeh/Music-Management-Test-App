import React from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.space['2xl']};
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${props => props.theme.space.md};
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.colors.error[700]};
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.space.sm};
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.md};
  max-width: 500px;
`;

const ErrorMessage = ({ message, title = 'Something went wrong' }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;
