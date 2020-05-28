const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        exclude: /node_modules/,
        loader: 'file-loader',
      }
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@img': path.resolve(__dirname, '../src/img'),
      '@models': path.resolve(__dirname, '../src/models'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@redux': path.resolve(__dirname, '../src/redux'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@systems': path.resolve(__dirname, '../src/systems'),
      '@utilities': path.resolve(__dirname, '../src/utilities'),
    },
    extensions: ['.css', '.sass', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Advanced React with Webpack Setup',
      template: './src/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
};
