import React from 'react';
import styled from '@emotion/styled';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  margin-top: ${props => props.theme.space['2xl']};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.space.xs};
    margin-top: ${props => props.theme.space.xl};
  }
`;

const PageButton = styled.button`
  min-width: 44px;
  height: 44px;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border: 1px solid ${props => props.isActive 
    ? props.theme.colors.primary[500] 
    : 'rgba(249, 115, 22, 0.3)'
  };
  background: ${props => {
    if (props.isActive) {
      return `linear-gradient(135deg, ${props.theme.colors.primary[500]} 0%, ${props.theme.colors.primary[600]} 100%)`;
    }
    return 'rgba(255, 255, 255, 0.05)';
  }};
  color: ${props => props.isActive 
    ? props.theme.colors.neutral[0] 
    : props.theme.colors.neutral[300]
  };
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

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

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary[400]};
    background: ${props => props.isActive 
      ? `linear-gradient(135deg, ${props.theme.colors.primary[400]} 0%, ${props.theme.colors.primary[500]} 100%)`
      : 'rgba(249, 115, 22, 0.2)'
    };
    box-shadow: ${props => props.theme.shadows.md};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.3);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 40px;
    height: 40px;
    padding: ${props => props.theme.space.xs} ${props => props.theme.space.sm};
    font-size: ${props => props.theme.fontSizes.xs};
  }
`;

const NavButton = styled(PageButton)`
  min-width: auto;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.xs};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.space.sm};
    min-width: 40px;
    
    .button-text {
      display: none;
    }
  }
`;

const PaginationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  color: ${props => props.theme.colors.neutral[400]};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: 0 ${props => props.theme.space.md};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    order: -1;
    margin: 0 0 ${props => props.theme.space.md} 0;
    font-size: ${props => props.theme.fontSizes.xs};
  }
`;

const Ellipsis = styled.span`
  color: ${props => props.theme.colors.neutral[500]};
  padding: 0 ${props => props.theme.space.xs};
  display: flex;
  align-items: center;
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Calculate start and end for middle pages
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Add dots after first page if needed
    if (start > 2) {
      rangeWithDots.push(1, '...');
    } else if (start === 2) {
      rangeWithDots.push(1);
    } else {
      rangeWithDots.push(1);
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    // Add dots before last page if needed
    if (end < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (end === totalPages - 1) {
      rangeWithDots.push(totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates and sort
    return [...new Set(rangeWithDots)];
  };

  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer>
      <PaginationInfo>
        <div>Page {currentPage} of {totalPages}</div>
      </PaginationInfo>
      
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous page"
      >
        <span>←</span>
        <span className="button-text">Previous</span>
      </NavButton>
      
      {visiblePages.map((page, index) => (
        page === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>⋯</Ellipsis>
        ) : (
          <PageButton
            key={page}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
            title={`Go to page ${page}`}
          >
            {page}
          </PageButton>
        )
      ))}
      
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next page"
      >
        <span className="button-text">Next</span>
        <span>→</span>
      </NavButton>
    </PaginationContainer>
  );
};

export default Pagination;
