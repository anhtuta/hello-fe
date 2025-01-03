var message = "hello nodeJS";
function sayHello() {
    console.log(message);
}

module.exports = {
    sayHello: sayHello,
    msg: message
}