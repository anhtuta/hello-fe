document.addEventListener("DOMContentLoaded", function() {
	window.addEventListener("scroll", function() {
		var scrollPosition = window.pageYOffset;	//vị trí của thanh scroll
		var pageHeight = document.body.scrollHeight;	//độ cao của trang
		var scrollHeight = document.documentElement.clientHeight;	//độ cao của thanh scroll
		var positionPercent = (scrollPosition + scrollHeight)/pageHeight;

		console.log(scrollPosition);
		console.log(pageHeight);
		console.log(scrollHeight);
		console.log(scrollPosition + scrollHeight, pageHeight);
		console.log(positionPercent);

		if(positionPercent > 0.98) {
			//load more data (using AJAX,...)
			loadMoreContents();
		}
	})
});

function loadMoreContents() {
	var wrapper = document.getElementById("wrapper");
	var p = document.createElement("p");
	p.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius fermentum mauris. Morbi scelerisque quam id condimentum scelerisque. Fusce egestas ultrices lacinia. Nulla facilisi. Suspendisse posuere tortor id orci tempus malesuada. Vestibulum eu mi nec enim luctus pellentesque. Sed dictum orci sit amet volutpat pharetra. Sed tristique enim nisl, vehicula viverra lacus gravida eu. Aliquam tempor metus ut lorem auctor vulputate. Aliquam ut est lacinia, laoreet tellus sed, malesuada felis. Vivamus dapibus justo id egestas placerat. Curabitur velit risus, commodo non augue vel, malesuada hendrerit arcu. Curabitur egestas quis leo at semper. Sed turpis ex, ornare sit amet lacinia at, sollicitudin at nulla. Morbi tristique, justo nec lacinia tempus, nunc ante bibendum est, a rutrum velit neque nec ipsum. Pellentesque at purus magna.";
	p.style.color = "cyan";
	wrapper.appendChild(p);

	var p2 = document.createElement("p");
	p2.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius fermentum mauris. Morbi scelerisque quam id condimentum scelerisque. Fusce egestas ultrices lacinia. Nulla facilisi. Suspendisse posuere tortor id orci tempus malesuada. Vestibulum eu mi nec enim luctus pellentesque. Sed dictum orci sit amet volutpat pharetra. Sed tristique enim nisl, vehicula viverra lacus gravida eu. Aliquam tempor metus ut lorem auctor vulputate. Aliquam ut est lacinia, laoreet tellus sed, malesuada felis. Vivamus dapibus justo id egestas placerat. Curabitur velit risus, commodo non augue vel, malesuada hendrerit arcu. Curabitur egestas quis leo at semper. Sed turpis ex, ornare sit amet lacinia at, sollicitudin at nulla. Morbi tristique, justo nec lacinia tempus, nunc ante bibendum est, a rutrum velit neque nec ipsum. Pellentesque at purus magna.";
	p2.style.color = "#1a5fce";
	wrapper.appendChild(p2);
			
}
