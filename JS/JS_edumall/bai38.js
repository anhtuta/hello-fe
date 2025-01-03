function menuIconEvent(element, position) {
	element.classList.toggle("white_color");
	//console.log(element);
	//console.log(this); thằng này là đối tượng window nhé!

	var fb_items = document.getElementsByClassName("fb_menu_items");
	for (var i = 0; i < fb_items.length; i++) {
		if(i != position) {
			// cho các menu khác ẩn đi
			fb_items[i].classList.add("being_hidden");

			//cho các icon menu khác màu đen
			var icon = document.getElementById("fb_menu_icon_" + i);
			icon.classList.remove("white_color");
		}
	};

	fb_items[position].classList.toggle("being_hidden");
	document.getElementById("div_turn_off").classList.remove("being_hidden");
}

document.getElementById("div_turn_off").onclick = function() {
	var fb_items = document.getElementsByClassName("fb_menu_items");
	for (var i = 0; i < fb_items.length; i++) {
		// cho các menu ẩn đi
		fb_items[i].classList.add("being_hidden");

		//cho các icon menu màu đen
		var icon = document.getElementById("fb_menu_icon_" + i);
		icon.classList.remove("white_color");
	};

	this.classList.add("being_hidden");
}