// normal function
function sayHello() {
    console.log("Hello att");
}
sayHello();

// function là tham số của 1 function khác (truyền function như 1 tham số)
function callAnotherFunction(fn) {
    fn();
}
callAnotherFunction(sayHello);

// function là 1 biến
var sayGoodbye = function() {
    console.log("Goodbye att");
}
sayGoodbye();

// function như 1 expression
callAnotherFunction(function() {
    console.log("Good morning");
})

console.log("\n============== Module demo =================\n");

// invoking a module from another file
// Chú Ý: khi require 1 module thì sẽ chạy cả code của module đó.
// Do đó trong 1 module ko nên có hàm console.log, nếu ko sẽ in ra console
// những info ko cần thiết
var md = require("./module1");    //we can write: ./module1.js
// gọi thứ đã đc export mà ko kèm theo tên ở bên 
// file ./module1.js. Chú ý: thứ đó phải là 1 function
md();

//gọi các hàm đã đc export
md.dtvt();
md.setIsShit();
//sayDtvtIsShit();
//md.sayDtvtIsShit();

/////////////
var md3 = require("./module3");
//md3 là 1 object nên ta phải truy cập đến thuộc tính hoặc method của nó,
//chứ ko đc gọi trực tiếp: md3()
md3.showInfo();
md3.name = "Nguyen bka";
md3.showInfo();

var md32 = require("./module3");
// md32 chính là md3.
// Bởi vì module3 trả về new Person(); do đó NodeJS KHÔNG khởi tạo 1 đối tượng mới
md32.showInfo();
console.log(md32 == md3);   //true

var md41 = require("./module4");
//md41.showInfo();  error!, do md41 chỉ là kiểu person mà thôi
var p = new md41();     //p = new Person();
p.showInfo();

var md2 = require("./module2");
console.log("msg = " + md2.msg);
md2.sayHello();

var md22 = require("./module2").sayHello;
md22();