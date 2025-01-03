var EvenEmitter = require("events");
var util = require("util");

function Dialog() {
    this.message = "Hello world!";
}

// dùng util kế thừa thằng EvenEmitter
util.inherits(Dialog, EvenEmitter); //Dialog sẽ kế thừa từ EvenEmitter
Dialog.prototype.sayHello = function(data) {
    console.log(this.message + ": " + data);
    this.emit("hello", data);
}

var dialog = new Dialog();
dialog.on("hello", function(data) {
    console.log("There a new hello! Data = " + data);
});

dialog.sayHello("Anhtuta95");
console.log("\n\n======================\n\n");

/*========== another example =========*/
function APS2() {
    this.course = "Algorithm Problem Solving 2";
    this.target = "STP members";
    this.date = "1/3/2018";
    this.name = "";
    
    this.uploadSolutionToServer = function(problemName) {
        //do something here...
        console.log("\temiting event uploadSolution...")
        this.emit("uploadSolution", problemName);
    };
    this.setName = function(name) {
        this.name = name;
    }
}
//tạo thêm 1 function khác cho class APS2, function này cũng sinh ra (emit) 1 sự kiện
APS2.prototype.playGame = function(gameName) {
    //do something here...
    console.log("\temiting event studentPlayGame...")
    this.emit("studentPlayGame", gameName);
}
util.inherits(APS2, EvenEmitter);

//Create an instance of APS2
var anhtu = new APS2();
var huy = new APS2();
anhtu.setName("Anh tu");
huy.setName("Huy tran");

//create listeners to handle some events
huy.on("uploadSolution", function(problemName) {
    console.log(this.name + " has just submited a solution on '" + problemName + "'! Server receiverd this solution and scoring, please wait...!");
});
huy.on("studentPlayGame", function(gameName) {
    console.log("Huy never play game during working time!");
});

anhtu.on("uploadSolution", function(problemName) {
    console.log("Thanks " + this.name + " for your submit! Server receiverd your solution on '" + problemName + "' and scoring, please wait...!");
});
anhtu.on("studentPlayGame", function(gameName) {
    console.log(this.name + "! You don't have permission to play '" + gameName + "' during working time! Stop now or you'll get fired!");
});

//now create some events by calling method
huy.uploadSolutionToServer("Pink and blue", "Huy tran");
anhtu.uploadSolutionToServer("Fast robot", "Anhtu");

huy.playGame("Kingdom rush");
anhtu.playGame("Clash of clans");

//*=========== another example ===========*/
function User() {
    this.name = "";
    this.setName = function(name) {
        this.name = name;
    }
}
util.inherits(User, EvenEmitter);
User.prototype.comment = function() {
    this.emit("someoneCommenting", this.name);
}

var phanh = new User();
phanh.setName("Phanh Lee");
phanh.comment();

function Handler() {}
util.inherits(Handler, EvenEmitter);
var handler = new Handler();
handler.on("someoneCommenting", function(data) {    //ko thể handler event của phanh!
    console.log("[handler] " + data + " is typing...");
})
