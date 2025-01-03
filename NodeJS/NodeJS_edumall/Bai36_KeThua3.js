'use strict';
var EvenEmitter = require("events");

//bài 31 dùng function, bài này dùng class
class Dialog extends EvenEmitter {
    constructor() {
        //phải gọi super constructor nếu ko báo lỗi: Must call super constructor 
        //in derived class before accessing 'this' or returning from derived constructor
        super();
        this.message = "Hello!";
    }
    sayHello (data) {
        console.log("[emit] " + this.message + ": " + data);
        this.emit("hello", data);
    }
}

var dialog = new Dialog();
dialog.on("hello", function(data) {
    console.log("[on] Co 1 loi chao moi, "+data);
});
dialog.sayHello("anhtu");

//Có thể tách riêng class Dialog ra thành 1 file.js riêng (1 module riêng)
//xem file Bai36_2.js