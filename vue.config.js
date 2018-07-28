module.exports = {
  baseUrl: "/",
  outputDir: ".demo",
  pages: {
    index: {
      entry: "examples/main.js",
      template: "examples/public/index.html",
      filename: "index.html"
    }
  }
};
