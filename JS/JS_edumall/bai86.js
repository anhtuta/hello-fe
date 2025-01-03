var currSlide = 0;	//chỉ số slide hiện tại (bắt đầu = 0)
var nextSlide = 0;	//chỉ số của slide tiếp theo khi ấn nút previous/next
var slides = document.querySelectorAll(".each_slide_wrapper");
var numOfSlides = slides.length;	//số lượng slide
var anim = 1;	//kiểu animation
var numOfAnim = document.getElementById("select_anim_type").length;	//số lượng animation
var isAnimTwoWay = false;	//hiệu ứng 2 chiều (trái, phải) hay 1 chiều

function btnPrevEvent() {
	nextSlide--;
	if(nextSlide < 0) nextSlide = numOfSlides - 1;
	if(isAnimTwoWay) activeSlide("right");		//đi từ phải sang
	else activeSlide();
}

function btnNextEvent() {
	nextSlide++;
	if(nextSlide >= numOfSlides) nextSlide = 0;
	if(isAnimTwoWay) activeSlide("left");		//đi từ trái sang
	else activeSlide();
}

//hiển thị nextSlide và ẩn thằng currSlide
function activeSlide(from=false) {
	if(from) {
		slides[currSlide].classList.remove("slide_appearing_left" + anim);
		slides[currSlide].classList.remove("slide_appearing_right" + anim);
		slides[currSlide].classList.add("slide_disappearing_" + from + anim);
		slides[nextSlide].classList.add("slide_appearing_" + from + anim);
		slides[nextSlide].classList.remove("slide_disappearing_left" + anim);
		slides[nextSlide].classList.remove("slide_disappearing_right" + anim);
	} else {
		slides[currSlide].classList.remove("slide_appearing" + anim);
		slides[currSlide].classList.add("slide_disappearing" + anim);
		slides[nextSlide].classList.add("slide_appearing" + anim);
		slides[nextSlide].classList.remove("slide_disappearing" + anim);
	}

	//DON'T FORGET THIS!
	currSlide = nextSlide;
}

function selectAnimType(element) {
	//remove all other animation
	for (var i = 0; i < numOfSlides; i++) {
		for (var j = 1; j <= numOfAnim; j++) {
			slides[i].classList.remove("slide_appearing" + j);
			slides[i].classList.remove("slide_appearing_left" + j);
			slides[i].classList.remove("slide_appearing_right" + j);
			slides[i].classList.remove("slide_disappearing" + j);
			slides[i].classList.remove("slide_disappearing_left" + j);
			slides[i].classList.remove("slide_disappearing_right" + j);
		};
	};

	//change type of animation
	anim = element.value;
	if(anim == 3 || anim == 4 || anim == 7) isAnimTwoWay = true;
	else isAnimTwoWay = false;
	if(isAnimTwoWay) activeSlide("left");		//đi từ trái sang
	else activeSlide();
}