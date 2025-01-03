/*
Nhắc lại: có thể dùng function để tạo 1 class như sau:

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
Person.prototype.showInfo = function() {
    console.log("Hello " + this.firstName + " " + this.lastName);
}
var att = new Person("Anhtu", "Ta");
att.showInfo();

sau đây ta sẽ dùng class
*/

'use strict';   //node4 phải dùng cái này thì mới sử dụng class được!

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    showInfo() {
        console.log("Hello " + this.firstName + " " + this.lastName);
    }
}
var att = new Person("Anhtu", "Ta");
att.showInfo();
var huy = new Person("Huy", "Tran");
huy.showInfo();

//so sánh xem att và huy có cùng kiểu hay ko
console.log(att.__proto__);
console.log(huy.__proto__);
console.log(att === huy);   //false
console.log(att.__proto__ === huy.__proto__);   //true
