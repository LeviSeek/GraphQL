module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: 'babel-loader',
        query: { presets: ['react', 'es2015']}
      }
    ]
  }
}
