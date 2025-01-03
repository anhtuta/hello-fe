// Object trong NodeJS khá giống JSON :)
var person = {
    firstName: "Nguyen",
    lastName: "Bka",
    showInfo: function() {
        console.log("Hello " + this.firstName + " " + this.lastName);
    }
}

person.showInfo();

// truy cập vào 1 phần tử của object: giống hệt Expression Language trong JSP
// nghĩa là có thể dùng 2 cách sau. Chú ý: person ở đây có kiểu khá giống Map trong JSP
console.log(person.firstName);
console.log(person["firstName"]);
var keyName = "firstName";
console.log(person[keyName]);
console.log(person.keyName);    // ko ra kq gì! Truy cập như vậy là SAI!

person.school = "HUST";
person.showInfo = function() {
    console.log("Hello " + this.firstName + " " + this.lastName + " - " + this.school);
}
person.showInfo();