const buff1 = new Buffer("Tao là Tạ Anh Tú");   //mặc định encode = utf8
console.log(buff1);
console.log(buff1.toString());  //mặc định encode = utf8
console.log(buff1.toString("ascii"));
console.log(buff1.toString("hex"));
console.log(buff1.toString("base64"));
console.log(buff1.toString("binary"));
console.log(buff1.toJSON());
console.log(buff1[3]);
console.log("\n=============\n")

const buff2 = new Buffer("54616f206cc3a02054e1baa120416e682054c3ba", "hex");
console.log(buff2);
console.log(buff2.toString());
console.log(buff2.toString("hex"));
console.log(buff2.toString("base64"));
buff2.write("May");
console.log(buff2.toString());