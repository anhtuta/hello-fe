'use strict';
var EvenEmitter = require("events");

module.exports = class Dialog extends EvenEmitter {
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