function loadSong(elem, event) {
  var file = elem.files[0];
  if (file == undefined) return;

  div_result.innerHTML = "";
  getById("lyric_playground").style.display = "none";
  clearPlayLyricInterval();

  getAudioMetadata(file, null);
  myAudio.src = URL.createObjectURL(elem.files[0]);

  initLyric();
  playSong();
  addAudioEvent();
}

function addAudioEvent() {
  myAudio.onplay = function () {
    if (playLyricInterval == null) setPlayLyricInterval();
    left_img.classList.remove("paused-spin");
    if (myAudio.currentTime === 0) {
      let file = getRequestParam("file");
      if (file && file.trim() !== "") {
        setTimeout(function () {
          let currFile = getRequestParam("file");
          if (currFile === file) {
            $.ajax({
              url: HOST_API + "/api/song/listens?file=" + file,
              type: 'PUT'
            }).then(res => {
              console.log(res);
            });
          }
        }, 60000);  // nghe 1 bài quá 1 phút mới tính 1 lượt nghe
      }
      setTimeout(function () {
        // reUpdateWordPass
        if (getById("word-0") != null) {
          for (let i = 0; i < cntWord; i++) {
            getById("word-" + i).classList.add("not-pass-word");
          }
        }
      }, 0);
    }
  }
  myAudio.onseeked = function () {
    clearCountdownInterval();
    if (playLyricInterval == null) {
      updateLyric();
    }
    setTimeout(function () {
      reUpdateWordPass();
    }, 0);
    scrollLyric();
  }
  myAudio.onpause = function () {
    clearCountdownInterval();
    if (playLyricInterval != null) clearPlayLyricInterval();
    left_img.classList.add("paused-spin");
  }
  myAudio.onvolumechange = function () {
    saveSettings("volume", myAudio.volume);
  }
  myAudio.onended = () => {
    console.log('ended')
    nextSong();
  }
}

function addToPlayedList() {
  if (playedList.indexOf(activeAudio) > 0) {
    // playedList KHÔNG được có 2 bài giống nhau
    playedList.splice(playedList.indexOf(activeAudio), 1);
  }
  playedList.push(activeAudio);
}

function nextSong() {
  if (playType === REPEAT_ONE) {
    activeAudio = activeAudio;
  } else {
    let currIndex = playedList.indexOf(activeAudio);
    if (currIndex >= 0 && currIndex < playedList.length - 1) {
      activeAudio = playedList[currIndex + 1];
    } else {
      if (playType === SHUFFLE) {
        // Tìm 1 bài ngẫu nhiên nhưng chưa có trong danh sách phát playedList
        // Nếu như đã phát toàn bộ các bài trong playedList rồi
        // thì thôi ko phát gì nữa. Nhưng cho tìm bài ngẫu nhiên 10000 lần thôi,
        // đề phòng ko tìm được thì treo máy!
        if(playedList.length === playList.length) {
          toastr["info"]("All songs has been played! Please F5 to play again!");
          return;
        }
        let cnt = 0;
        while (true) {
          let temp = Math.floor(Math.random() * (playList.length - 1));
          if (!playedList.includes(temp) || ++cnt >= 10000) {
            activeAudio = temp;
            break;
          }
        }
      } else {  // default playType = SEQUENCE
        activeAudio = (++activeAudio) % playList.length;
      }
      addToPlayedList();
    }
  }
  window.history.pushState(null, null, "?file=" + playList[activeAudio].fileName);
  playSong();
}

function prevSong() {
  if (playType === REPEAT_ONE) {
    activeAudio = activeAudio;
  } else {
    let currIndex = playedList.indexOf(activeAudio);
    if (currIndex > 0) {
      activeAudio = playedList[currIndex - 1];
    } else {
      toastr.warning("This is the first song of playing list!");
      return;
    }
  }
  window.history.pushState(null, null, "?file=" + playList[activeAudio].fileName);
  playSong();
}

function playSong(isClicked = false) {
  let file = getRequestParam("file");
  if (file && file.trim() !== "") {
    let select_mp3_from_local = getById("select_mp3_from_local");
    if (select_mp3_from_local) {
      select_mp3_from_local.parentElement.removeChild(select_mp3_from_local);
    }

    let songURL = HOST_API + "/api/song/file?file=" + file;
    myAudio.src = songURL;

    activeTr(file, isClicked);
    showAudioMetadata(getLyric.bind(null, file));
  }

  var playPromise = myAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      playAudio();
    }).catch(_ => {
        console.log("Cannot play audio if user doesn't interact with the page first!");
      });
  }
  getByClass("ll_player").style.display = "";
  changeAudioSpeed();
  changeAudioVolume();
}

function playAudio() {
  myAudio.play();
  getByClass("ll_player").classList.remove("ll-paused");
  getByClass("ll_player").classList.add("ll-playing");
  getByClass("ll-play-pause").setAttribute("title", "Pause");
  getCurrentTime();
}

function pauseAudio() {
  myAudio.pause();
  getByClass("ll_player").classList.remove("ll-playing");
  getByClass("ll_player").classList.add("ll-paused");
  getByClass("ll-play-pause").setAttribute("title", "Play");
}

function changeAudioSpeed() {
  let speed = getRequestParam("speed");
  if (speed) {
    myAudio.playbackRate = speed;
    saveSettings("speed", Number(speed));
  } else {
    speed = getSetting("speed");
    if (speed) myAudio.playbackRate = speed;
  }
}

function changeAudioVolume() {
  let vol = getSetting("volume");
  if (vol) {
    myAudio.volume = vol;
    getByClass("slider-volume").value = vol * 100;
  }
}

function reUpdateWordPass() {
  let currWordID = getCurrentWordByTime(myAudio.currentTime);
  if (currWordID >= 0) {
    for (let i = 0; i < currWordID; i++) {
      let passedWord = getById("word-" + i);
      passedWord.classList.remove("not-pass-word");
      if (passedWord.getAttribute("is-empty") === "1") {
        passedWord.innerHTML = "&nbsp;";  // remove bullet text
      }
      fillKaraokeWord(passedWord);
    }
    for (let i = currWordID; i < cntWord; i++) {
      let notPassWord = getById("word-" + i);
      notPassWord.classList.add("not-pass-word");
      if (notPassWord.getAttribute("is-empty") === "1") {
        notPassWord.innerHTML = "&nbsp;";  // remove bullet text
      }
      emptyKaraokeWord(notPassWord);
    }
  }
}

function showAudioMetadata(callback) {
  if (activeAudio == null || !playList || playList.length === 0) return;

  let songItem = playList[activeAudio];
  getById("song_details").innerHTML = getSongDetails(songItem);
  let art = getById("art");

  if (songItem.imageUrl && songItem.imageUrl.trim() !== "") {
    art.src = HOST_API + songItem.imageUrl;
    left_img.src = art.src;
    div_background.style.backgroundImage = "url('" + art.src + "')";
  } else {
    art.src = "./images/favicon.png";
    left_img.src = "./images/favicon.png";
    div_background.style.backgroundImage = "url('./images/background.jpg')";
  }

  if (callback) { callback(); };
}

// Function này khá giống function ở trên (showAudioMetadata)
// nên nếu sửa thì phải sửa cả 2
// Ref: https://github.com/leetreveil/musicmetadata/blob/master/example/index.html
function getAudioMetadata(data, callback) {
  musicmetadata(data, function (err, metadata) {
    if (err) throw err;

    metadata.artist = metadata.artist[0];
    getById("song_details").innerHTML = getSongDetails(metadata);
    let art = getById("art");

    if (metadata.picture.length > 0 && metadata.picture[0].data.length > 0) {
      var image = metadata.picture[0];
      var url = URL.createObjectURL(new Blob([image.data], { 'type': 'image/' + image.format }));
      art.src = url;
      left_img.src = art.src;
      div_background.style.backgroundImage = "url('" + art.src + "')";
      metadata.imageUrl = url;
    } else {
      art.src = "./images/background.jpg";
      left_img.src = "./images/favicon.png";
      div_background.style.backgroundImage = "url('./images/background.jpg')";
    }

    if (callback) { callback(); };
  });
}

function getSongDetails(json) {
  let hideInfo = getRequestParam("hideInfo");
  title = json.title && json.title.trim() ? json.title : "No title";
  artist = json.artist && json.artist.trim() ? json.artist : "No artist";
  album = json.album && json.album.trim() !== "" ? json.album : "No album";
  let imageUrl = json.imageUrl ? HOST_API + json.imageUrl : null;

  getByClass("left_title").innerText = hideText(title, hideInfo);
  getByClass("left_artist").innerText = hideText(artist, hideInfo);
  getByClass("left_album").innerHTML = "(" + hideText(album, hideInfo) + ")";
  document.title = title + " - " + artist + " | Liliana Player";
  setMediaSessionMeta(title, artist, imageUrl);

  return "<div class='song_title'>" + hideText(title, hideInfo) + "</div>" +
    "<div class='song_artist'>" + hideText(artist, hideInfo) + "</div>" +
    "<div class='song_album'>(" + hideText(album, hideInfo) + ")</div>";
}

function hideText(text, hideInfo) {
  return hideInfo === "true" ? "Hidden" : text;
}

function setPlayType(pt) {
  let llShuffle = getByClass("ll-shuffle");
  let llRepeat = getByClass("ll-repeat");
  if(!pt) pt = SEQUENCE; // default = SEQUENCE
  playType = pt;
  if (pt === SHUFFLE) {
    llShuffle.classList.add("active");
    llRepeat.classList.remove("active");
  } else if (pt === REPEAT_ONE) {
    llShuffle.classList.remove("active");
    llRepeat.classList.add("active");
  } else {
    llShuffle.classList.remove("active");
    llRepeat.classList.remove("active");
  }
  saveSettings("playType", pt);
}
