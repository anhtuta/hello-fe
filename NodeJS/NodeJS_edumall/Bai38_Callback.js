var firstFunction = function() {
    console.log("I'm first!");
}

var secondFunction = function() {
    setTimeout(firstFunction, 2000);
    console.log("I'm second!");
}

secondFunction();