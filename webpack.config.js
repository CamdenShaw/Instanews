module.exports = {
  entry: './js/src/cup-a-joe.js',
  devtool: 'inline-source-map',
  output: {
    filename: './js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },{
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader?name=./styles/fonts/[name].[ext]&emitFile=false'
        }]
      },
      {
        test: /\.(svg|gif)$/,
        use: [{
          loader: 'file-loader?name=./assets/images/[name].[ext]&emitFile=false'
        }]
      }
    ]
  },
  devServer: {
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}