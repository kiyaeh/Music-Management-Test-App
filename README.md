# 🎵 Addis Music Managerement Web App

A full-stack music management application built with React, Redux Saga, and Webpack. This project demonstrates modern frontend development practices with manual Webpack configuration and comprehensive CRUD operations and For This Test Project I Use AI Assistent models Like CloudeSonnet For UI design And Different Common Components And Testing .

## ✨ Features Implemented

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete songs
- ✅ **Pagination**: Navigate through large song collections
- ✅ **Form Validation**: Client-side validation with user-friendly error messages
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Loading States**: Visual feedback during API operations
- ✅ **Error Handling**: Graceful error handling with user feedback

### Technical Features
- ✅ **Manual Webpack Setup**: Custom configuration without CRA
- ✅ **Redux Saga**: Async operations handling
- ✅ **Emotion Styling**: CSS-in-JS with theme system
- ✅ **MirageJS Mock API**: Full-featured development server
- ✅ **Jest Testing**: Comprehensive test coverage
- ✅ **Environment Configuration**: Production/development configs

### UI/UX Features
- ✅ **Modal Interface**: Clean add/edit song interface
- ✅ **Confirmation Dialogs**: Prevent accidental deletions
- ✅ **Duration Formatting**: Human-readable time display (3:45)
- ✅ **Genre Selection**: Dropdown with predefined genres
- ✅ **Visual Feedback**: Loading spinners, hover effects
- ✅ **Empty States**: Helpful messages when no songs exist

## 📋 Project Overview

This application allows users to manage a collection of songs with full CRUD (Create, Read, Update, Delete) functionality. It features a responsive design, pagination, and a mock API server for development.

### 🛠 Technologies Used

- **Frontend**: React 18 (Functional Components with Hooks)
- **State Management**: Redux Toolkit + Redux-Saga
- **Styling**: Emotion + Styled System
- **Build Tool**: Webpack 5 (Manual Configuration)
- **Mock API**: MirageJS
- **Testing**: Jest + React Testing Library

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kiyaeh/Music-Management-Test-App.git
   cd Music-Management-Test-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm start` - Runs the app in development mode with hot reloading
- `npm run build` - Builds the app for production to the `dist` folder
- `npm test` - Runs the test suite with Jest
- `npm run test:watch` - Runs tests in watch mode for development

## 🏗 Architecture & Design Decisions

### Manual Webpack Configuration

Instead of using Create React App, this project uses a custom Webpack configuration to demonstrate build tool proficiency:

#### Key Webpack Features:
- **Custom file type rules**: SVG handling with @svgr/webpack for React components
- **Environment variables**: API_BASE_URL configuration
- **Code splitting**: Production bundle optimization
- **Hot Module Replacement**: Fast development experience
- **Asset optimization**: Images, fonts, and other assets



### State Management Architecture

#### Redux Toolkit + Redux-Saga
- **Redux Toolkit**: Reduces boilerplate, includes RTK Query capabilities
- **Redux-Saga**: Handles complex async operations with generator functions
- **Benefits**: Predictable state updates, easy testing, side-effect management

#### Store Structure:
```
store/
├── store.js          # Main store configuration
├── slices/
│   └── songsSlice.js # Songs state management
└── sagas/
    ├── rootSaga.js   # Root saga combiner
    └── songsSaga.js  # Songs API side effects
```

## 📁 Project Structure

```
src/
├── components/           # React components
├── store/               # Redux store configuration
├── services/            # API service layer
├── mirage/              # Mock API server
├── styles/              # Theme and global styles
├── App.js               # Main application component
└── index.js             # Application entry point
```

## 📝 API Endpoints

- `GET /api/songs?page=1&limit=10` - Fetch paginated songs
- `POST /api/songs` - Create a new song
- `PUT /api/songs/:id` - Update an existing song
- `DELETE /api/songs/:id` - Delete a song


