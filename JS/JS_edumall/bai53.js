var sidebar_status = false;
function btnPushEvent() {
	//var sidebar = document.getElementById("sidebar");
	var wrapper = document.getElementById("wrapper");
	var bg_black = document.getElementById("bg_black");
	var body = document.getElementById("_body");

	wrapper.classList.add("move_right");
	bg_black.classList.remove("black_bg_hidden");
	body.classList.add("overflow_hidden");
}

document.getElementById("bg_black").onclick = function() {
	var wrapper = document.getElementById("wrapper");
	var bg_black = document.getElementById("bg_black");
	var body = document.getElementById("_body");
	
	wrapper.classList.remove("move_right");
	bg_black.classList.add("black_bg_hidden");
	body.classList.remove("overflow_hidden");
}