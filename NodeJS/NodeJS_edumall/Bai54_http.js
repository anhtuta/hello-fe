var http = require("http");
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello web from node.js");
}).listen(3000, "127.0.0.1");
/*
http là 1 module kế thừa từ EventEmitter, nên nó có thể lắng nghe 1 sự kiện
sau khi có 1 request đến, do đó cần 1 hàm callback */