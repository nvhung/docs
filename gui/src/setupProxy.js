const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    const proxy = createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
    });
    console.log(app);
    // app.get('/api/document/*', proxy);
    app.post('/api/document/', proxy);
    app.put('/api/*', proxy);
    // app.put('/api/document/*', proxy);
    // app.use('/api/document', proxy);
    app.get('/api/document/*', proxy);
    // app.use('/api/document/1', proxy);
};
