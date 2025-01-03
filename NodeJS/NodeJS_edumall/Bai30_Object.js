/*
Có 3 cách kế thừa trong Javascript
- dùng "class_name".prototype
- dùng Object.create
- dùng util.inherits
Liệu có đúng ko???
*/

var person = {
    name: "",
    school: "",
    getInfo: function() {
        return this.name + " - " + this.school;
    }
}

//create new object, kế thừa thằng person
var anhtu = Object.create(person);
anhtu.name = "Anhtu";
anhtu.school = "HUST";

var huy = Object.create(person);
huy.name = "Huy";
huy.school = "HUST";

console.log(anhtu.getInfo());
console.log(huy.getInfo());

function Student() {
    this.name = "";
    this.school = "";
    this.getInfo = function() {
        return this.name + " - " + this.school;
    }
}

var st1 = new Student();
st1.name = "Nguyen bka";
st1.school = "HUST";
console.log(st1.getInfo());