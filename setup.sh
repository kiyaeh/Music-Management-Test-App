#!/bin/bash

# Setup script for Music Management Test App
echo "🎵 Setting up Music Management Test App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -c2-)
REQUIRED_VERSION="18.0.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
    echo "⚠️  Node.js version $NODE_VERSION detected. Version $REQUIRED_VERSION or higher is recommended."
fi

echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up environment files
echo "🔧 Setting up environment files..."

if [ ! -f .env.development ]; then
    cp .env.development.example .env.development
    echo "✅ Created .env.development from template"
else
    echo "ℹ️  .env.development already exists"
fi

if [ ! -f .env.production ]; then
    cp .env.production.example .env.production
    echo "✅ Created .env.production from template"
else
    echo "ℹ️  .env.production already exists"
fi

echo ""
echo "🎉 Setup complete! You can now run:"
echo "   npm start    - Start development server"
echo "   npm test     - Run tests"
echo "   npm run build - Build for production"
echo ""
echo "📖 See ENVIRONMENT.md for more details about environment configuration."
