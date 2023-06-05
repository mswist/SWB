const fs = require('fs');
const path = require('path');
const mq = require('./mq.js')

const contentType = {
    'html': 'text/html',
    'js': 'text/javascript',
    'css': 'text/css'
}

const routes = {
    static: (req, res) => {
        let filePath = './public' + req.url;
        if (req.url == '/') filePath += '/index.html';
        const ext = path.extname(filePath).slice(1);
        fs.readFile(filePath, (err, content) => {
            if(err) res.end()
            else {
                res.writeHead(200, { 'Content-Type':  contentType[ext]});
                res.end(content, 'utf-8');
            }
        })        
    },
    result: (req, res) => {
        const chunks = [];
        req.on("data", (chunk) => {
          chunks.push(chunk);
        });
        req.on("end", async () => {
          const data = Buffer.concat(chunks);
          const stringData = data.toString();
          console.log(JSON.parse(stringData));
          let result = await mq.putMessage(JSON.parse(stringData))
          res.end(JSON.stringify(result))
        });
    },
    messages: async (req, res) => {
        let message = await mq.getMessages()
        res.end(JSON.stringify(message))
    }
};

module.exports = routes