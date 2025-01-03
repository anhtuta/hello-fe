function readDatabase(callback) {
    var user = {
        name: "Anh tu",
        age: "23"
    }
    callback(user);
}

readDatabase(function() {
    console.log("Read done callback");
})

readDatabase(function(data) {
    console.log("read done again, data = ");
    console.log(data);
})