function Person() {
    this.name = "Anhtu ta 95";
    this.school = "HUST";
    this.showInfo = function() {
        console.log(this.name + " - " + this.school);
    }
}

module.exports = new Person();