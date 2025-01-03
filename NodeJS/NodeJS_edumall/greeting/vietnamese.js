var greetings = require("./greetings.json");

var sayHello = function() {
    //console.log("Xin chao");
    console.log(greetings.vi);     // lấy data từ file JSON
}

module.exports = sayHello;