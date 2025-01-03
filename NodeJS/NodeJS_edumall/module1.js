console.log("\nThis is the beginning of module1.js");

var sayDtvtIsShit = function() {
    console.log("DTVT is shit!");
}

var fuckJavascript = function() {
    console.log("javascript sida vai!");
}

// dùng exports để chỉ ra các file khác có thể sử dụng function này
module.exports = sayDtvtIsShit;     //vô dụng, vì dòng dưới đã gán giá trị khác
module.exports = fuckJavascript;
/*
Nếu trong file khác có đoạn code như sau
var md = require("./moduleDemo");
md();
Thì hàm md() ở trên sẽ gọi hàm fuckJavascript(), nghĩa là đối tượng module.exports
đã bị ghi đè
Do đó ta có thể export theo tên export đc nhiều function
*/
module.exports.dtvt = sayDtvtIsShit;

// Cách khác để export
module.exports.setIsShit = function() {
    console.log("SET is shit!");
}
console.log("This is the end of module1.js\n");