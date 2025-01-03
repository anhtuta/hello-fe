function Person(name, password) {
    this.name = name;
    this.password = password;
}

// mở rộng thêm method getName() cho Person
Person.prototype.getName = function() {
    return this.name;
}

// mở rộng thêm method getPassword() cho Person
Person.prototype.getPassword = function() {
    return this.password;
}

Person.prototype.getLevel = function() {
    return this.level;
}

// mở rộng thêm thuộc tính level cho Person
Person.prototype.level = "admin";

// Tạo 1 class User
function User(name) {
    this.name = name;
}

// mở rộng thằng User: cho nó kế thừa Person
User.prototype = new Person();

var p = new Person("Anhtu", "1234");
var u = new User("Nguyen", "1111");

console.log(u.getName());
console.log(u.getLevel());
console.log(u.getPassword());   //User có thuộc tính password nhưng chưa đc khởi tạo giá trị

console.log("\n" + p.getName());
console.log(p.getLevel());
console.log(p.getPassword());

u.password = "xyz";
console.log(u.getPassword());

// Mở rộng hàm cho class Date
Date.prototype.vnFormat = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() + 1;       //Chú ý rằng tháng có giá trị từ 0 - 11
    var dd = this.getDate();
    return dd + "/" + mm + "/" + yyyy;
}

var now = new Date();
var d1 = new Date(2017, 11, 04);    //Chú ý rằng tháng có giá trị từ 0 - 11
console.log(now.vnFormat());
console.log(d1.vnFormat());     //4/12/2017