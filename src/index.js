import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from './App';
import { startMirageServer } from './mirage/server';

// Start the mock API server for demo purposes
console.log('Starting MirageJS server...');
startMirageServer();
console.log('MirageJS server started');

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
