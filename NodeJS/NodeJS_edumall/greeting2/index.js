var greet_en = require("./greeting_en.json");
var greet_vn = require("./greeting_vn.json");

var showInfo = function(lang) {
    var greet;
    if(lang == "vn") {
        greet = greet_vn;
    } else if(lang == "en") {
        greet = greet_en;
    }
    console.log(greet.hello + "\n" + greet.school + "\n" + greet.faculty);
}

//2 cách export, chúng khác nhau ở nơi gọi nó
module.exports = showInfo;
module.exports.info = showInfo;