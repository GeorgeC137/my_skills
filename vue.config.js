module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:1738',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
}

