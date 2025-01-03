// Trong JS: nếu tham số của hàm là kiểu primitive thì đó là truyền tham trị,
// nếu tham số của hàm là kiểu Class (kiểu tham chiếu) thì đó là truyền tham chiếu
function passByValue(b) {
    b = 2;
}

var a = 1;
passByValue(a);
console.log(a);     //gia tri cua a ko thay doi!

function passByReference(obj) {
    obj.property1 = function() {
        console.log("This is property1");
    };
    obj.property2 = function() {

    };
    obj.data = 11;
}

var c = {};
//c.property1 = {};
passByReference(c);     // c sẽ có thêm các thuộc tính property1,2 và data
console.log(c);

///////////////
var age = {value: 23};
console.log(age);   //{value: 23}
function increaseAge(obj) {
    obj.value += 10;
}
increaseAge(age);
console.log(age);   //{value: 33}