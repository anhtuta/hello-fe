var currSlide = 1;
var pages = document.querySelectorAll(".slide_demo ul li");
var switchSlideInterval = setInterval(switch_slide, 3000, -1);

document.addEventListener("DOMContentLoaded", function() {
	for (var i = 0; i < pages.length; i++) {
		pages[i].addEventListener('click', function() {
			clearInterval(switchSlideInterval);
			switch_slide(this.innerHTML);
			//switchSlideInterval = setInterval(switch_slide, 3000, -1);
		});
	};
	switch_slide(1);
});

function switch_slide(slide_num) {
	for (var j = 0; j < pages.length; j++) {
		pages[j].classList.remove("active_slide");
		document.getElementById("each_slide_wrapper_" + (j+1)).classList.add("hidden");
		document.getElementById("each_slide_wrapper_" + (j+1)).classList.remove("active_sld");
		document.getElementById("bottom_image2_" + (j+1)).classList.add("hidden");
	};

	//active this slide
	if(slide_num != -1) {
		currSlide = slide_num;
	}
	
	var currPage = document.getElementById("page_" + currSlide);
	currPage.classList.add("active_slide");
	document.getElementById("each_slide_wrapper_" + currPage.innerHTML).classList.remove("hidden");
	document.getElementById("each_slide_wrapper_" + currPage.innerHTML).classList.add("active_sld");
	//document.getElementById("bottom_image2_" + currPage.innerHTML).classList.add("hidden");	//ko cần, vì trong phần CSS có phần animation thay đổi opacity rồi
	currSlide++;
	if(currSlide == 4) currSlide = 1;
}