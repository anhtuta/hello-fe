var greetings = require("./greetings.json");

var sayHello = function() {
    //console.log("Hello");
    console.log(greetings['en']);   // lấy data từ file JSON
}

module.exports = sayHello;