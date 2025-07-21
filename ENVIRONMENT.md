# Environment Setup

This project uses environment variables for configuration. Follow these steps to set up your environment:

## Quick Setup

1. Copy the example environment files:
   ```bash
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```

2. Edit the files with your specific configuration:
   - `.env.development` - for local development
   - `.env.production` - for production deployment

## Environment Variables

### Development (.env.development)
- `NODE_ENV` - Set to "development"
- `API_BASE_URL` - Your development API URL (default: "/api")
- `FAST_REFRESH` - Enable React Fast Refresh (default: true)
- `REACT_APP_VERSION` - Application version for development
- `REACT_APP_NAME` - Application name for development

### Production (.env.production)
- `NODE_ENV` - Set to "production"
- `API_BASE_URL` - Your production API URL
- `GENERATE_SOURCEMAP` - Generate source maps (default: false)
- `INLINE_RUNTIME_CHUNK` - Inline runtime chunk (default: false)
- `REACT_APP_VERSION` - Application version for production
- `REACT_APP_NAME` - Application name for production

## Security Notes

- Never commit actual `.env` files to version control
- Use `.env.example` files to show required variables
- Keep sensitive values (API keys, secrets) only in your local `.env` files
- Use your deployment platform's environment variable settings for production

## Troubleshooting

If environment variables aren't loading:
1. Make sure your `.env` files are in the project root
2. Restart your development server after changing `.env` files
3. Check that variable names start with `REACT_APP_` for client-side variables
