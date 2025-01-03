var Emitter = require("./Bai28_emiiter");
//module emiiter.js là tự viết, có thể dùng module có sẵn như sau:
//var Emitter = require("events");    //kq cũng giống nhau thoai!
var conf = require("./Bai28_config");
var ev_names = require("./Bai28_config").event_names;

var emitter = new Emitter();

//bộ lắng nghe sự kiện tên là bad_score
emitter.on("bad_score", function() {
    console.log("Một môn nào đó bị điểm kém!");
});

//làm thêm điểu gì đó nữa nếu sự kiện bad_score được emit
emitter.on(conf.event_names.BAD_SCORE, function() {     //có thể dùng: ev_names.BAD_SCORE
    console.log("Rất tiếc nhưng mày phải học lại! Ngu vl!!!!");
});

var scores = [10, 4, 3, 9];
for(var s of scores) {
    if(s < 5) {
        console.log("score is bad!!!!", s);
        emitter.emit("bad_score");
    }
}

//bộ lắng nghe sự kiện tên là wtf
emitter.on("wtf", function() {
    console.log("What the f*ck??? What the heck are you doing???");
});

//phát sự kiện tên là wtf
emitter.emit("wtf");

console.log("\n============== Demo =============\n");
console.log(conf);
console.log(conf.event_names);
console.log(conf.my_name);
console.log(conf.my_school);
console.log(conf.event_names.BAD_SCORE);
console.log(conf.BAD_SCORE);    //undefined!
console.log(ev_names.BAD_SCORE);

