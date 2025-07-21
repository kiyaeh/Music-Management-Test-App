@echo off
echo 🎵 Setting up Music Management Test App...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Set up environment files
echo 🔧 Setting up environment files...

if not exist .env.development (
    copy .env.development.example .env.development >nul
    echo ✅ Created .env.development from template
) else (
    echo ℹ️  .env.development already exists
)

if not exist .env.production (
    copy .env.production.example .env.production >nul
    echo ✅ Created .env.production from template
) else (
    echo ℹ️  .env.production already exists
)

echo.
echo 🎉 Setup complete! You can now run:
echo    npm start    - Start development server
echo    npm test     - Run tests
echo    npm run build - Build for production
echo.
echo 📖 See ENVIRONMENT.md for more details about environment configuration.
pause
