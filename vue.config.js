module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/vue-auto-storage/" : "/",
  outputDir: "docs",
  pages: {
    index: {
      entry: "examples/main.js",
      template: "examples/index.html",
      filename: "index.html"
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      "element-ui": "ELEMENT"
    }
  }
};
