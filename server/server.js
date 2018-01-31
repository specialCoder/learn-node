/**
 * node 默认自带的模块: http url net child_process fs
 */
/**
 * http.createServer
 * res.writeHead
 * res.write
 * res.end
 * require(child_process).exec
 * req.setEncoding
 * 
*/
const http = require('http');
const url = require('url');
const router = require('./route/index').router;
const handlers = require('./request/requestHandlers');
const start = ()=>{
    const onRequest = (req,res,next)=>{
        let postData = '';
        const pathname = url.parse(req.url).pathname.slice(1);
        router(pathname,handlers,res,req);
        // req.setEncoding('utf8');
        // req.addListener('data',(postDataChunk)=>{
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk '"+ postDataChunk + "'.");
        // });
        // req.addListener('end',(postDataChunk)=>{
        //     router(pathname,handlers,res,postData);
        // });
    }
    const httpServer = http.createServer(onRequest);
    httpServer.listen(3000);
    console.log(' start...');
}
exports.start  = start;

