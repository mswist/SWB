const https = require('https');
const { resolve } = require('path');
const CorrID = '752CA7A1EDE0F94C919446BFBE8442A80000000000000000'

const mq = {
    options: {
        'host': 'amsdevaixprf04.fnfis.com',
        'port': 9443,
        'path': '/ibmmq/rest/v2/messaging/qmgr/SWBMQ1/queue/INF.COVIS.SW.VALUATION.RESP/message',
        'headers': {
            'ibm-mq-rest-csrf-token': 'blank',
            'Authorization': `Basic ${Buffer.from("mqm:mquser").toString('base64')}`
        } 
    },

    putMessage: async (msg) => {
        const options = Object.assign({'method': 'POST'}, mq.options)
        options.headers['ibm-mq-md-correlationId'] = msg.correlationId || CorrID
        options.headers['ibm-mq-md-replyTo'] = 'INF.SW.COVIS.VALUATION.CONF'
        options.headers['Content-Type'] = 'text/plain;charset=utf-8'
        let response = {"msgId":"", "status": ""}
        try {
            defer(response)
            let postResult = https.request(options, (res) => {
                response.msgId = res.headers["ibm-mq-md-messageid"]
                response.status = res.statusCode
                response.resolve()
            })
            postResult.write(msg.msg);
            postResult.end();
            let fullResp = await response.promise
        }
        catch(err) {
            console.log(err)
        }
        return {
            "msgId": response.msgId,
            "status": response.status
        }
    },

    getMessages: async () => {
        const options = Object.assign({'method': 'DELETE'}, mq.options)
        options.path = '/ibmmq/rest/v2/messaging/qmgr/SWBMQ1/queue/INF.SW.COVIS.VALUATION.CONF/message'
        //console.log(options)
        let response = {"msg":"","correlationId":"","msgId":"", "status":""}
        try {
            defer(response)
            console.log("*** requesting new message ***")
            let getMessages = https.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}:${res.statusMessage}`);
                console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                response.correlationId = res.headers["ibm-mq-md-correlationid"]
                response.msgId = res.headers["ibm-mq-md-messageid"]
                response.status = res.statusCode
                res.on('data', (data) => {
                    console.log(`partial data: ${data}`)
                    response.msg += data
                })
                res.on('end', (data) => {
                    console.log(`Full data: ${response.msg}`)
                    response.resolve()
                    //return res.statusCode
                })
            })
            getMessages.end()
            let fullResp = await response.promise
        }
        catch (err) {
            console.log(err)
        }
        return {
            "msg": response.msg, 
            "correlationId": response.correlationId, 
            "msgId": response.msgId,
            "status": response.status
        }
    }
}

function defer(obj) {
    obj.promise = new Promise((resolve, reject) => {
        obj.resolve = resolve;
        obj.reject  = reject;
    });
}

module.exports = mq