import '@testing-library/jest-dom';

// Mock MirageJS for tests
jest.mock('./mirage/server', () => ({
  startMirageServer: jest.fn()
}));

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.confirm for delete confirmations
global.confirm = jest.fn();
