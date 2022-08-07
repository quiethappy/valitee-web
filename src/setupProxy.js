const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      },
    })
  );

  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      ws: true
    })
  );

};