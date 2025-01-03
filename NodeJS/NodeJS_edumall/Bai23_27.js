var util = require("util");
var name = "Anhtu";
var message = util.format("Hello %s", name);
console.log(message);
util.log(message);

console.log(util.isArray(name));
console.log(util.isArray([]));
console.log(util.isArray({}));
console.log(util.isArray(new Array));

var url = require("url");
var urlInfo = url.parse("https://example.com:3000/demo?name=Anhtu");
console.log(urlInfo);
console.log(urlInfo.path);

console.log("\n============= Demo array =============\n");
var arr = [4,5,6,7];
for(var item of arr) console.log(item, item === 5, "wtf???");

const MY_NAME = 'Anhtu';
//MY_NAME = "Nguyen";   error!
console.log(MY_NAME);

arr.push(function() {
    console.log("This is a function");
});

console.log(arr[4]);
arr[4]();

console.log("\n============= Demo forEach =============\n");
//item là giá trị của từng phần tử của mảng ở mỗi vòng lặp
arr.forEach(function(item) {
    if(typeof(item) == "function") item();
    else console.log("item = " + item);
})

console.log("\n============= Demo object =============\n");
var obj = {my_addr: "Ha Dong, Hanoi, VN"};
var foo = "my_addr";
console.log(obj["my_addr"]);
console.log(obj.my_addr);
console.log(obj[foo]);  //3 cách này cũng giống trong JSP, php
