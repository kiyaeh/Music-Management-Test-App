// Theme configuration for Emotion/Styled System
export const theme = {
  colors: {
    // Primary Brand Colors - Orange (Energy, Creativity, Music)
    primary: {
      50: '#fff7ed',    // Very light orange
      100: '#ffedd5',   // Light orange
      200: '#fed7aa',   // Lighter orange
      300: '#fdba74',   // Medium light orange
      400: '#fb923c',   // Medium orange
      500: '#f97316',   // Main orange
      600: '#ea580c',   // Darker orange
      700: '#c2410c',   // Dark orange
      800: '#9a3412',   // Very dark orange
      900: '#7c2d12'    // Deepest orange
    },

    // Secondary Colors - Potato/Warm Beige (Comfort, Warmth, Stability)
    secondary: {
      50: '#fef9e7',    // Very light potato
      100: '#fef3c7',   // Light potato
      200: '#fde68a',   // Lighter potato
      300: '#fcd34d',   // Medium light potato
      400: '#fbbf24',   // Medium potato
      500: '#f59e0b',   // Main potato
      600: '#d97706',   // Darker potato
      700: '#b45309',   // Dark potato
      800: '#92400e',   // Very dark potato
      900: '#78350f'    // Deepest potato
    },

    // Neutral Colors - Black/Gray Scale (Sophistication, Elegance)
    neutral: {
      0: '#ffffff',     // Pure white
      50: '#fafafa',    // Off white
      100: '#f4f4f5',   // Very light gray
      200: '#e4e4e7',   // Light gray
      300: '#d4d4d8',   // Medium light gray
      400: '#a1a1aa',   // Medium gray
      500: '#71717a',   // Base gray
      600: '#52525b',   // Dark gray
      700: '#3f3f46',   // Very dark gray
      800: '#27272a',   // Almost black
      900: '#18181b',   // Deep black
      950: '#0a0a0a'    // Pure black
    },

    // Status Colors with warm undertones
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d'
    },
    warning: {
      50: '#fefbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c'
    },

    // Background Colors
    background: {
      primary: '#0a0a0a',      // Pure black
      secondary: '#18181b',     // Deep black
      tertiary: '#27272a',     // Dark gray
      surface: '#3f3f46',      // Surface gray
      card: '#ffffff',         // White cards
      overlay: 'rgba(0, 0, 0, 0.8)'
    }
  },
  
  space: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px  
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '5rem',    // 80px
    '5xl': '6rem'     // 96px
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem'     // 48px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  
  borderRadius: {
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(249, 115, 22, 0.3)', // Orange glow
    'glow-strong': '0 0 30px rgba(249, 115, 22, 0.5)'
  },
  
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Animation and transitions
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
    spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
  }
};
