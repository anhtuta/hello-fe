getByClass("btn_toggle_setting").addEventListener("click", function () {
  this.style.display = "none";
  $("#setting_wrapper").show(100);
});

getByClass("btn_align_left").addEventListener("click", function () {
  settingLyricAlign("left");
});
getByClass("btn_align_center").addEventListener("click", function () {
  settingLyricAlign("center");
});
getByClass("btn_align_right").addEventListener("click", function () {
  settingLyricAlign("right");
});
function settingLyricAlign(align) {
  div_result.style.textAlign = align;
  saveSettings("lyricAlign", align);
}

getByClass("btn_theme_dark").addEventListener("click", function () {
  settingThemeDark();
});
getByClass("btn_theme_light").addEventListener("click", function () {
  settingThemeLight();
});
getByClass("btn_theme_picture_bg").addEventListener("click", function () {
  settingThemePictureBg();
});
function settingThemeDark() {
  settingTheme("dark", "none");
}
function settingThemeLight() {
  settingTheme("light", "none");
}
function settingThemePictureBg() {
  settingTheme("picture-bg", "");
}
function settingTheme(themeName, bgImageDisplay) {
  changeTheme(themeName, bgImageDisplay);
  saveSettings("theme", themeName);
}

/**
 * Note: Class theme sẽ bắt đầu = "div-res-"
 * Do đó những class ko liên quan đến theme KO được bắt đầu = "div-res-"
 */
function changeTheme(themeName, bgImageDisplay) {
  div_result.classList.forEach(className => {
    if (className.includes("div-res-")) div_result.classList.remove(className);
  });
  div_result.classList.add("div-res-" + themeName);
  div_background.style.display = bgImageDisplay;

  let lyric_playground = getById("lyric_playground");
  lyric_playground.classList.forEach(className => {
    if (className.includes("lyric-pg-")) lyric_playground.classList.remove(className);
  });
  lyric_playground.classList.add("lyric-pg-" + themeName);
}

getByClass("btn_karaoke_mode").addEventListener("click", function () {
  toggleKaraokeMode();
});
function toggleKaraokeMode() {
  if(!div_result.classList.contains("karaoke-mode")) {
    setKaraokeMode(true);
  } else {
    setKaraokeMode(false);
  }
}
function setKaraokeMode(isKaraokeMode) {
  if(isKaraokeMode === true) {
    div_result.classList.add("karaoke-mode");
    div_result.classList.remove("karaoke-off");
    saveSettings("karaokeMode", true);
  } else if(isKaraokeMode === false) {
    div_result.classList.remove("karaoke-mode");
    div_result.classList.add("karaoke-off");
    saveSettings("karaokeMode", false);
  }
}
getByClass("btn_blur_mode").addEventListener("click", function () {
  toggleBlurMode();
});
function toggleBlurMode() {
  if(!div_result.classList.contains("blur-mode")) {
    setBlurMode(true);
  } else {
    setBlurMode(false);
  }
}
function setBlurMode(isBlurMode) {
  if(isBlurMode === true) {
    div_result.classList.add("blur-mode");
    saveSettings("blurMode", true);
  } else if(isBlurMode === false) {
    div_result.classList.remove("blur-mode");
    saveSettings("blurMode", false);
  }
}
getByClass("btn_gigantic_line").addEventListener("click", function () {
  toggleGiganticLine();
});
function toggleGiganticLine() {
  if(!div_result.classList.contains("div-res-big-active-line")) {
    setGiganticLine(true);
  } else {
    setGiganticLine(false);
  }
}
function setGiganticLine(isGiganticLine) {
  if(isGiganticLine === true) {
    div_result.classList.add("div-res-big-active-line");
    saveSettings("giganticLine", true);
  } else if(isGiganticLine === false) {
    div_result.classList.remove("div-res-big-active-line");
    saveSettings("giganticLine", false);
  }
}
getByClass("btn_word_appear").addEventListener("click", function () {
  toggleWordAppear();
});
function toggleWordAppear() {
  if(!div_result.classList.contains("word-appear")) {
    setWordAppear(true);
  } else {
    setWordAppear(false);
  }
}
function setWordAppear(isWordAppear) {
  if (isWordAppear === true) {
    div_result.classList.add("word-appear");
    saveSettings("wordAppear", true);
  } else if (isWordAppear === false) {
    div_result.classList.remove("word-appear");
    saveSettings("wordAppear", false);
  }
}

getById("btn_reset_audio").addEventListener("click", function () {
  getById("btn_select_audio").value = "";
});
div_result.addEventListener("click", function () {
  $("#setting_wrapper").hide(100);
  $(".btn_toggle_setting").show(100);
  // btn_toggle_setting.style.display = "";
  // setting_wrapper.style.display = "none";
});
getByClass("btn_fullscreen").addEventListener("click", function () {
  if (div_result.classList.contains("lyric_fullscreen")) {
    setLyricNormal();
  } else {
    setLyricFullscreen();
  }
});
left_img.addEventListener("click", function () {
  if (left_img.classList.contains("paused-spin")) {
    left_img.classList.remove("paused-spin");
  } else {
    left_img.classList.add("paused-spin");
  }
});

function setLyricNormal() {
  div_result.classList.add("lyric_normal");
  div_result.classList.remove("lyric_fullscreen");
  div_result.classList.add("show-left-normal");
  div_result.classList.remove("show-left-fs");
  document.body.classList.remove("overflow-hidden");
  getByClass("btn_sync_wrapper").style.display = "";
  getById("hide_when_fullscreen").style.display = "";
  div_background.classList.remove("bg-image-fullscreen");
  getByClass("setting_bottom").classList.remove("setbot_fs");
  div_left_wrapper.classList.remove("left_fs");
  div_left_wrapper.classList.add("left_normal");
  getByClass("ll_player").classList.remove("ll_player_fs");

  saveSettings("fullscreen", false);
  // scrollPage(myAudio, 300);
  setTimeout(() => {
    scrollLyric();
  }, 350)
}

function setLyricFullscreen() {
  div_result.classList.add("lyric_fullscreen");
  div_result.classList.remove("lyric_normal");
  div_result.classList.add("show-left-fs");
  div_result.classList.remove("show-left-normal");
  document.body.classList.add("overflow-hidden");
  getByClass("btn_sync_wrapper").style.display = "none";
  getById("hide_when_fullscreen").style.display = "none";
  div_background.classList.add("bg-image-fullscreen");
  getByClass("setting_bottom").classList.add("setbot_fs");
  div_left_wrapper.classList.add("left_fs");
  div_left_wrapper.classList.remove("left_normal");
  getByClass("ll_player").classList.add("ll_player_fs");

  saveSettings("fullscreen", true);
  setTimeout(() => {
    scrollLyric();
  }, 350)
}

getByClass("select_mp3_label").addEventListener("click", function () {
  var select_mp3_wrapper = getByClass("select_mp3_wrapper");
  if (select_mp3_wrapper.style.display === "none") {
    select_mp3_wrapper.style.display = "";
    scrollPage(getByClass("liliana-lyric"), 300);
  } else {
    select_mp3_wrapper.style.display = "none";
  }
});

window.addEventListener("keydown", function (e) {
  // this.console.log(e);
  switch (e.keyCode) {
    case 37:
      // ArrowLeft
      myAudio.currentTime -= 5;
      break;
    case 39:
      // ArrowRight
      myAudio.currentTime += 5;
      break;
  }
});

function showSyncToast() {
  if (offsetTime > 0) {
    toastr["info"]("Delay " + offsetTime + "ms");
  } else {
    toastr["info"]("Advance " + (0 - offsetTime) + "ms");
  }
}
getByClass("btn_sync_up").addEventListener("click", function () {
  offsetTime += 100;
  showSyncToast();
  updateOffsetTime();
});
getByClass("btn_sync_down").addEventListener("click", function () {
  offsetTime -= 100;
  showSyncToast();
  updateOffsetTime();
});
function updateOffsetTime() {
  $.ajax({
    url: HOST_API + "/api/lyric/update/offset?file=" + lyricFile + "&offset=" + offsetTime
  }).then(res => {
    console.log(res);
  }).fail(err => {
    console.log(err);
  });
}

getByClass("btn_increase_speed").addEventListener("click", function () {
  updateSpeed(0.1);
});
getByClass("btn_decrease_speed").addEventListener("click", function () {
  updateSpeed(-0.1);
});
function updateSpeed(offset) {
  let speed = getSetting("speed");
  if(speed == null || speed == undefined) speed = 1;
  speed = Number(speed);
  speed += offset;
  speed = Number(speed.toFixed("1"));
  myAudio.playbackRate = speed;
  toastr.info("Speed: " + speed + "x");
  saveSettings("speed", speed);
}

getByClass("slider-volume").oninput = function() {
  volume = this.value / 100;
  myAudio.volume = volume;
  saveSettings("volume", volume);
}

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaSession
function setMediaSessionMeta(title, artist, imgUrl) {
  if(!imgUrl) {
    imgUrl = DEFAULT_MEDIA_SESSION_IMAGE;
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: title,
    artist: artist,
    artwork: [
      { src: imgUrl,   sizes: '96x96',   type: 'image/png' },
      { src: imgUrl, sizes: '128x128', type: 'image/png' },
      { src: imgUrl, sizes: '192x192', type: 'image/png' },
      { src: imgUrl, sizes: '256x256', type: 'image/png' },
      { src: imgUrl, sizes: '384x384', type: 'image/png' },
      { src: imgUrl, sizes: '512x512', type: 'image/png' },
    ]
  });
}
if ('mediaSession' in navigator) {
  setMediaSessionMeta("Title", "Artist", null);

  navigator.mediaSession.setActionHandler('previoustrack', prevSong);
  navigator.mediaSession.setActionHandler('nexttrack', nextSong);
  navigator.mediaSession.setActionHandler('play', playAudio);
  navigator.mediaSession.setActionHandler('pause', pauseAudio);
  navigator.mediaSession.setActionHandler('stop', pauseAudio);
}

getByClass("btn_dark_mode").onclick = function () {
  let body_wrapper = getByClass("body_wrapper");
  if (body_wrapper.classList.contains("body-light")) {
    setBodyMode("dark");
  } else {
    setBodyMode("light");
  }
};
function setBodyMode(mode) {
  let body_wrapper = getByClass("body_wrapper");
  if (mode === "light") {
    body_wrapper.classList.remove("body-dark");
    body_wrapper.classList.add("body-light");
    getByClass("btn_dark_mode").classList.remove("fa-adjust");
    getByClass("btn_dark_mode").classList.add("fa-moon");
    getByClass("btn_dark_mode").setAttribute("title", "Dark mode");
    saveSettings("bodyMode", "light");
  } else if (mode === "dark") {
    body_wrapper.classList.remove("body-light");
    body_wrapper.classList.add("body-dark");
    getByClass("btn_dark_mode").classList.remove("fa-moon");
    getByClass("btn_dark_mode").classList.add("fa-adjust");
    getByClass("btn_dark_mode").setAttribute("title", "Light mode");
    saveSettings("bodyMode", "dark");
  }
}