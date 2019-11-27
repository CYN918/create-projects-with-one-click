module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  parallel: true,
  productionSourceMap: false,
  filenameHashing: true,
  css: {
    sourceMap: false
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8070,
    before: app => {}
  }
};
