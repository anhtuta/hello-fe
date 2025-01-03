var fs = require("fs");

//Đọc file 1 cách đồng bộ, KHÔNG nên dùng với file lớn
var content = fs.readFileSync(__dirname + "/demo.txt", "utf-8");  //__dirname = tên thư mục hiện tại chứa file này
console.log(content);
console.log("done!");

console.log("\n==================\n");

//Đọc ko đồng bộ
fs.readFile(__dirname + "/demo.txt", "utf-8", function(err, data) {
    if(err) {
        throw err;
    }
    console.log(data);
});
console.log("done!");

//Nhận xét: do đọc ko đồng bộ nên hàm callback function(err, data) sẽ được thực hiện khi đọc xong,
//chứ ko được thực hiện luôn, do đó dòng chữ done! sẽ được in ra trước