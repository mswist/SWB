//import http
const http = require('http');
const route = require('./routes.js')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//define server
const server = http.createServer((req, res) => {
    // define routes:
    // POST /valuation_result
    if(req.method == 'POST' && req.url == '/valuation_result') route.result(req, res)
    else if(req.method == 'GET' && req.url == '/messages') route.messages(req, res)
    // everything else - static
    else route.static(req, res)
});

//start server
server.listen(3000);
console.log('Node.js web server at port 3000 is running..')