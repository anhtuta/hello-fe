var fs = require("fs");
var zlib = require("zlib");
var readable = fs.createReadStream(__dirname + "/demo2.txt", {
    encoding: "utf-8",
    highWaterMark: 16*1024     //đọc dưới dạng buffer có kích thước = 16KByte,nghĩa là ta chia file demo2 ra thành nhiều mảnh, mỗi mảnh 16KB
});

//tạo file cần ghi vào
var writeable = fs.createWriteStream(__dirname + "/write_demo2.txt");

//tạo file cần nén
var compressed = fs.createWriteStream(__dirname + "/write_demo2.txt.gz");

//copy
readable.pipe(writeable);

//compress
var gzip = zlib.createGzip();
readable.pipe(gzip).pipe(compressed);