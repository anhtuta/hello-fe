var util = require("util");

var student = {
    name:"Nguyen bka",
    address:"HCMC",
    sayHello: function() {
        console.log(`Hello world, I'm ${this.name}`);
    }
}
student.sayHello();
student.sayHello.call({name: "Anhtu"}); //truyền vào 1 object khác
student.sayHello.apply({name: "Huy tran"});
console.log("\n=================\n");

//khác nhau giữa call và apply
var student2 = {
    name:"Nguyen bka",
    address:"HCMC",
    sayHello: function(param1, param2) {
        console.log(`Hello world, I'm ${this.name}`);
        console.log("params: ", param1, param2);
    }
}
student2.sayHello("Xin chào", "Fuck ĐTVT");
student2.sayHello.call({name: "Anhtu"}, "Xin chào", "Fuck ĐTVT"); //truyền vào 1 object khác, thay đổi giá tri thuộc tính của đối tượng student2
student2.sayHello.apply({name: "Huy tran"}, ["Xin chào", "Fuck ĐTVT"]);
console.log("\n=================\n");

//============== Bai 34 =================//
function Person() {
    this.name = "Nguyen bka";
    this.address = "HCMC";
}
Person.prototype.printInfo = function() {
    console.log("Hello, I'm " + this.name + ", and I'm living in " + this.address);
}

function Person2() {
    this.id = "1234";

    //gọi hàm khởi tạo của lớp cha, giống super() trong Java.
    //sau khi gọi hàm này thì đối tượng Person2 sẽ có các giá trị
    //của các thuộc tính name, address như Person.
    //Nếu ko gọi hàm này thì Person2.name = Person2.address = undefined
    Person.call(this);
}
util.inherits(Person2, Person);
var p2 = new Person2();
p2.printInfo();

//============== vd khac =================//
function Person3() {
    this.school = "HUST";
    Person.apply(this);     //kế thừa các giá trị của các thuộc tính từ lớp cha Person
}
Person3.prototype.printDetails = function() {
    console.log(`Hi, I'm ${this.name}. I come from ${this.address} and now I'm studying at ${this.school}`);
}
util.inherits(Person3, Person);
var p3 = new Person3();
p3.printDetails();
