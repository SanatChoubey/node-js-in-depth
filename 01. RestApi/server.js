const http = require('http');
const https = require('https');
const fs = require('fs');
// const URl = require('url');

const server = http.createServer((req, res) => {
    // parse da string to obejct

    // const parsedUrl = new URL(req.url)
    
    // console.log('Url status', req.url, req.data, )

    // to get method of request && header
    // console.log(req.method, req.headers);

    //only send string with res.send! 
    // to get data in context of http is from buffer we
    //  collect it 
    // it is the way but we can use *string decode* as well to decode the buffer to string 
    req.on('data', (data) => {

        console.log('on header data ', data);
        // yeah i know it is stupid thing to allocunsafe with buffer
        // note that buffer is a global access 🤣

        const buffdata = Buffer.allocUnsafe(20);
        buffdata.fill(data);
        console.log('to string', buffdata.toString('utf8'))
    }) 
    req.on('end', () => {
        //to set type of header which tell browser that provide json!
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200)
        res.end( 'Hello Node JS !');
    })
    
});

server.listen(4000, ()=>{
    console.log('node js clean server served! 🚀')
})

const httpsOptions = {
    key: fs.readFileSync('./sslcert/key.pem'),
    cert: fs.readFileSync('./sslcert/certificate.pem')
}
const httpsServer = https.createServer(httpsOptions, (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    const response  = routeHandler(req.url)
    console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
    console.log(`%c${req.url}`, 'background: orange; color: pink');
    res.end(JSON.stringify(response))
});

httpsServer.listen(5000, () => {
    console.log('listening on https😁! 🚀')
});
const routeHandler = (route) => {
    switch (route) {
        case '/': return "welcome to node js master class!"
        case '/ping': return {msg: "pong"}
        default: return "please enter correct path!"
    }
}
