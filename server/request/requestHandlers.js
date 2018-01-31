// const exec = require('child_process').exec;
const queryString = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

const start = (response,request)=>{
    console.log('server start ------->');
    const body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" enctype="multipart/form-data" '+ 'method="post">'+
                '<input type="file" name="upload" multiple = "multiple">'+
                '<input type="submit" value="Upload file" />'+
                '</form>'+
                '</body>'+
                '</html>';
        // response.writeHead(200, {"Content-Type": "text/plain"});
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
    // exec('ls -lah',(err,stdout,stderr)=>{
    //     console.log(stdout);
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.write(stdout);
    //     response.end();
    // });
    // return 'hello start ';
}
const upload = (response,request)=>{
    console.log('server upload ------>');
    console.log("Request handler 'upload' was called."); 
    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.write("You've sent: " + queryString.parse(postData).text); 
    const form = new formidable.IncomingForm();
    form.parse(request,(err,field,files)=>{
        fs.renameSync(files.upload.path,'./tmp/test.png');
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>"); 
        response.write("<img src='/show' />");//?
        response.end();
    });
}
const show = (response, postData) =>{
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
    response.writeHead(500, {"Content-Type": "text/plain"}); 
    response.write(error + "\n");
    response.end();
    } else {
    console.log('show~~~~~~~~~~');
    response.writeHead(200, {"Content-Type": "image/png"});
    response.write(file, "binary");
    response.end();
    } });
    }
module.exports={
    start,
    upload,
    show,
};