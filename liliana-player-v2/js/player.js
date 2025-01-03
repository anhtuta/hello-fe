var currentTime = getByClass("current-time");
var progressWrapper = getByClass("progress");
var progressBar = progressWrapper.childNodes[0];
let ll_player = getByClass("ll_player");
var mouseDown = false;
var showCurrentTime;

function secsToMins(time) {
  var int = Math.floor(time),
    mins = Math.floor(int / 60),
    secs = int % 60,
    newTime = mins + ":" + ("0" + secs).slice(-2);

  return newTime;
}

function getCurrentTime() {
  var currentTimeFormatted = secsToMins(myAudio.currentTime),
    currentTimePercentage = (myAudio.currentTime / myAudio.duration) * 100;

  currentTime.innerText = currentTimeFormatted;
  progressBar.style.width = currentTimePercentage + "%";

  if (ll_player.classList.contains("ll-playing")) {
    showCurrentTime = requestAnimationFrame(getCurrentTime);
  } else {
    cancelAnimationFrame(showCurrentTime);
  }
}

myAudio.onloadedmetadata = function () {
  var durationFormatted = secsToMins(myAudio.duration);
  getByClass("duration").innerText = durationFormatted;
};

ll_player.onmousedown = function () {
  mouseDown = true;
};
ll_player.onmouseup = function () {
  mouseDown = false;
};

progressWrapper.onclick = updateProgressBar;
progressWrapper.onmousemove = updateProgressBar;
function updateProgressBar(e) {
  var totalWidth = progressWrapper.offsetWidth;
  var offsetX = e.offsetX;
  var offsetPercentage = offsetX / totalWidth;

  if (mouseDown || e.type === "click") {
    myAudio.currentTime = myAudio.duration * offsetPercentage;
    if (ll_player.classList.contains("ll-paused")) {
      getCurrentTime();
    }
  }
}

getByClass("ll-play-pause").onclick = function () {
  if (ll_player.classList.contains("ll-paused")) {
    playAudio();
  } else if (ll_player.classList.contains("ll-playing")) {
    pauseAudio();
  }
};
getByClass("ll-btn-prev").onclick = prevSong;
getByClass("ll-btn-next").onclick = nextSong;
getByClass("ll-shuffle").onclick = function () {
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    this.setAttribute("title", "Shuffle");
    setPlayType(SEQUENCE);
  } else {
    this.classList.add("active");
    this.setAttribute("title", "Turn off shuffle");
    setPlayType(SHUFFLE);
    getByClass("ll-repeat").classList.remove("active");
  }
};
getByClass("ll-repeat").onclick = function () {
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    this.setAttribute("title", "Repeat one");
    setPlayType(SEQUENCE);
  } else {
    this.classList.add("active");
    this.setAttribute("title", "Turn off repeat one");
    setPlayType(REPEAT_ONE);
    getByClass("ll-shuffle").classList.remove("active");
  }
};
