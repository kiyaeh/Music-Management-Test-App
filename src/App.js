import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from './App';
import { startMirageServer } from './mirage/server';

// Start the mock API server in development
if (process.env.NODE_ENV !== 'production') {
  console.log('Starting MirageJS server...');
  startMirageServer();
  console.log('MirageJS server started');
}

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Global, css } from '@emotion/react';
import { theme } from './styles/theme';
import SongManager from '@components/SongManager';

// Global styles
const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, ${theme.colors.background.primary} 0%, ${theme.colors.background.secondary} 100%);
    color: ${theme.colors.neutral[0]};
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    position: relative;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary[500]};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary[600]};
  }

  /* Selection Styling */
  ::selection {
    background: ${theme.colors.primary[500]};
    color: ${theme.colors.neutral[0]};
  }

  /* Focus Styling */
  *:focus {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Loading Animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    60% { transform: translateY(-3px); }
  }

  /* Mobile-first responsive typography */
  @media (max-width: ${theme.breakpoints.sm}) {
    body {
      font-size: 14px;
    }
  }

  @media (min-width: ${theme.breakpoints.md}) {
    body {
      font-size: 16px;
    }
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <SongManager />
    </ThemeProvider>
  );
};

export default App;
