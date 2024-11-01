const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    const proxy = createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
    });
    
    app.post('/api/*', proxy);
    app.put('/api/*', proxy);
    app.delete('/api/*', proxy);
    app.get('/api/*', proxy);
};
