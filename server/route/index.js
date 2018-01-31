const router = (pathname,handlers,response,request)=>{
    console.log('route module pathname ==>',pathname);
    const callback = handlers[pathname];
    if(typeof callback === 'function'){
        const context = callback(response,request);
        return context;
    }else{
        console.log("No request handler found for " + pathname); 
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
exports.router = router;