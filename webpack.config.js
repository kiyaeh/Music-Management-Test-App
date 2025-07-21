const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    // Entry point of our application
    entry: './src/index.js',
    
    // Output configuration
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true, // Clean dist folder before each build
      publicPath: '/'
    },
    
    // Module resolution
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    },
    
    // Loaders for different file types
    module: {
      rules: [
        // JavaScript and JSX files
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ],
              plugins: ['@emotion/babel-plugin']
            }
          }
        },
        
        // CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        
        // Images - Custom rule as required
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        },
        
        // SVG files - Custom rule as required
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
              }
            },
            'url-loader'
          ]
        },
        
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]'
          }
        }
      ]
    },
    
    // Plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      })
    ],
    
    // Development server configuration
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true, // Support for React Router
      compress: true
    },
    
    // Environment variables support
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new (require('webpack')).DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
        'process.env.API_BASE_URL': JSON.stringify(
          process.env.API_BASE_URL || '/api'
        )
      })
    ],
    
    // Optimization for production
    optimization: {
      splitChunks: isProduction ? {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      } : false
    },
    
    // Source maps for debugging
    devtool: isProduction ? 'source-map' : 'eval-source-map'
  };
};
