const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')

// Serve up public/ftp folder
const serve = serveStatic('.', {
  index: 'index.html',
  setHeaders: (res, path) => {
    // Set header to force download
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Origin', 'http://payfit.io:8000')
  },
})

serveStatic.mime.define({
  'application/wasm': ['wasm'],
  'text/html': ['html'],
  'text/javascript': ['js'],
}, true)

// Create server
const server = http.createServer((req, res) => serve(req, res, finalhandler(req, res)))

console.log('starting server')
// Listen
server.listen(8000)
