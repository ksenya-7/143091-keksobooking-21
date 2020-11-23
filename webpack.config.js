const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/backend.js",
    "./js/debounce.js",
    "./js/error-success.js",
    "./js/view.js",
    "./js/card.js",
    "./js/render.js",
    "./js/move.js",
    "./js/filter.js",
    "./js/open.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
