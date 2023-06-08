const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: process.env.PRODUCTION ? process.env.SERVER_URL : 'http://localhost:5005',
      changeOrigin: true,
    }),
  );
};