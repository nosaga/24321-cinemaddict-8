const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(`C:\\Users\\viole\\Desktop\\htmlAcademy\\24321-cinemaddict-8\\`, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(`C:\\Users\\viole\\Desktop\\htmlAcademy\\24321-cinemaddict-8\\`, `public`),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true
  }
}
