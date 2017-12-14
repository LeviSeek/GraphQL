module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: 'babel-loader',
        query: { 
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['./js/babelRelayPlugin'].map(require.resolve)
        }
      }
    ]
  }
}
