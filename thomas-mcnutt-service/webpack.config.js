const path = require('path');

module.exports = {
  target: 'node',
  entry: './Client/src',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './Client/dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './Client/dist', // this is for hot-reloading, check npm run hot in package.json setup
    // can also specify port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  mode: 'development',
};
