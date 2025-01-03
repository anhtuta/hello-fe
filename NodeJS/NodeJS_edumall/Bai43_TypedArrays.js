var buffer = new ArrayBuffer(8);    //8 byte, mà kiểu int là 4 byte, nên buffer chỉ chứa được 2 phần tử
var view = new Int32Array(buffer);
view[0]=5;
view[1]=10;
view[2]=12;     //ko có ý nghĩa, vì tối đa chỉ 2 phần tử

console.log(view);
