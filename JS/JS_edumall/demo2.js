document.addEventListener("DOMContentLoaded", afterContentLoaded,
	contentNotLoadedYet);	//tham số cuối thường để là false chứ ko phải 1 function
function afterContentLoaded() {
	console.log("Content loaded!!!");
	var btn3 = document.getElementById("btn3");
	btn3.onclick = function() {
		console.log("This is btn3");
	}
}
function contentNotLoadedYet() {
	console.log("Content hasn't loaded yet!!!");	
}

//==============
var btn1 = document.getElementById("btn1");
btn1.onclick = function() {
	var btns = document.querySelectorAll(".btn");
	console.log(btns);
	console.log(btns[0].classList);
	//btns[2].classList.remove("btn-success");	//remove a class
	
	//Cách khác đơn giản hơn
	var btn3 = document.getElementById("btn3");
	btn3.classList.remove("btn-success");
}

var btn2 = document.getElementById("btn2");
btn2.onclick = function() {
	var btn3 = document.getElementById("btn3");
	//add a class
	btn3.classList.add('btn-success');
	btn3.classList.add('btn-block');
}

document.getElementById("btn4").onclick = function() {
	var btn3 = document.getElementById("btn3");
	//toggle a class (toggle: nếu ko có thì thêm vào, nếu có thì bỏ đi)
	btn3.classList.toggle('btn-success');
}

document.getElementById("btn5").onclick = function() {
	var d2 = document.getElementById("d2");
	d2.classList.toggle("move-right");
}

document.getElementById("btn6").onclick = function() {
	var d3 = document.getElementById("d3");
	d3.classList.toggle("move-right-using-keyframe");
}

var d4_status = true;
document.getElementById("btn7").onclick = function() {
	var d4 = document.getElementById("d4");
	console.log(d4_status);
	if(d4_status) {
		d4.classList.add("d4_first_direct");
		d4.classList.remove("d4_second_direct");
	} else {
		d4.classList.add("d4_second_direct");
		d4.classList.remove("d4_first_direct");
	}
	d4_status = !d4_status;
}
