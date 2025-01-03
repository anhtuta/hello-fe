var EvenEmitter = require("events");
var util = require("util");

function Dialog() {
    this.message = "Hello world!";
}

// dùng util kế thừa thằng EvenEmitter
util.inherits(Dialog, EvenEmitter);
Dialog.prototype.sayHello = function() {
    console.log(this.message);
    this.emit("hello");
}

var dialog = new Dialog();
dialog.on("hello", function() {
    console.log("There a new hello");
});

dialog.sayHello("Anhtuta95");

