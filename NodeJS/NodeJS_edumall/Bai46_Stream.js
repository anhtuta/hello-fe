var fs = require("fs");
var readable = fs.createReadStream(__dirname + "/demo2.txt", {
    encoding: "utf-8",
    highWaterMark: 16*1024     //đọc dưới dạng buffer có kích thước = 16KByte,nghĩa là ta chia file demo2 ra thành nhiều mảnh, mỗi mảnh 16KB
});

var writeable = fs.createWriteStream(__dirname + "/write_demo2.txt");

readable.on("data", function(chunk) {
    //console.log(chunk.toString());
    console.log(chunk.length);
    //đọc từng mảnh (chunk) và ghi nó sang file write_demo2.txt
    writeable.write(chunk);
});

//Cách làm trên thường dùng để xử lý với những file rất lớn (đọc ghi từng phần thay vì toàn bộ)