"use strict";

let bodyMode = getSetting("bodyMode");
if(bodyMode) {
  setBodyMode(bodyMode);
}
showAllSongs(null, null);
saveSettingFromParams();
let file = getRequestParam("file");
if (file && file.trim() !== "") {
  playSong();
}
addAudioEvent();

function setPlayLyricInterval() {
  if (myAudio && !myAudio.paused) {
    playLyricInterval = setInterval(function () {
      updateLyric();
    }, 30);
  }
}

function clearPlayLyricInterval() {
  clearInterval(playLyricInterval);
  playLyricInterval = null;
}

/**
 * Get lyric for a song
 * (title and artist of this song were stored in title and artist variables)
 * @param {string} file Name of mp3 file
 */
async function getLyric(file) {
  setFetchingLyric();
  let lyricURL;
  let fileName = file.substr(0, file.length - 4); // remove ".mp3"
  let isFoundLyric = false;
  const lyricURLs = [
    HOST_API + "/api/lyric?file=" + artist + " - " + title + ".trc",
    HOST_API + "/api/lyric?file=" + fileName + ".trc",
    HOST_API + "/api/lyric?file=" + artist + " - " + title + ".lrc",
    HOST_API + "/api/lyric?file=" + fileName + ".lrc",
  ];

  for (let i = 0; i < lyricURLs.length; i++) {
    lyricURL = lyricURLs[i];
    if (i > 1) isLrc = true;
    else isLrc = false;

    const lyric = await $.ajax({
      url: lyricURL,
    });
    if (lyric !== "Lyric doesn't exist!") {
      saveLyric(lyric);
      lyricFile = lyricURL.substring(lyricURL.indexOf("?file=") + 6);
      isFoundLyric = true;
      break;
    }
  }

  if (!isFoundLyric) {
    lyricFile = null;
    setNoLyric();
  }
}

function saveLyric(lyric) {
  lines = lyric.trim().split("\n");
  initLyric();
}

function isNoLyric() {
  return lines.length === 0;
}

function setNoLyric() {
  lines = [];
  initLyric();
}

function setFetchingLyric() {
  lines = [];
  div_result.innerHTML = "Fetching lyric, please wait...";
}

function initLyric() {
  setPlayLyricInterval();
  var liliana_lyric = getByClass("liliana-lyric");
  getById("lyric_playground").style.display = "";
  div_result.innerHTML = "";
  startTimes = [];
  endTimes = [];
  cntWord = 0;
  offsetTime = 0;
  currWordID = -1;

  let fileName = getRequestParam("file");
  if (!fileName || fileName.trim() === "") {
    // Nếu người dùng ko truyền param fileName trên URL thì ta đọc lyric từ textarea
    if (liliana_lyric.value.trim() !== "") {
      lines = liliana_lyric.value.trim().split("\n");

      // check lyric type
      for (var i = 0; i < lines.length; i++) {
        let temp = lines[i].match(/\[\d+:\d+\.\d+\]/g); // ex: temp = ["[1:15.047]"]
        if (temp != null && temp.length > 0) {
          temp = lines[i].match(/<\d+>[^\<]*/g);
          if (temp != null && temp.length > 0) {
            isLrc = false;
          } else {
            isLrc = true;
          }
          break;
        }
      }
    } else {
      lines = [];
    }
  }

  if (isNoLyric()) {
    div_result.innerHTML = NO_LYRIC;
  } else {
    if (isLrc) initLrcLyric();
    else initTrcLyric();
  }

  let btnResetAudio = getById("btn_reset_audio");
  if (btnResetAudio) btnResetAudio.style.display = "none";
  initSettingsAtPlayer();

  // scrollPage(myAudio, 500);
}

function initTrcLyric() {
  let temp, startLine, wordsInLine, startWord, endWord, divLine, divLyricInfo;
  let lyricAuthor, lyricCreatedDate;
  div_result.innerHTML = "";
  for (let i = 0; i < lines.length; i++) {
    temp = lines[i].match(/\[\d+:\d+\.\d+\]/g); // ex: temp = ["[1:15.047]"]
    if (temp != null) {
      startLine = decodeTime(temp[0]); // ex: 75.047
      temp = lines[i].substring(temp[0].length); // ex: <271>I <256>keep <790>saying <1254>no
      wordsInLine = temp.match(/<\d+>[^\<]*/g);
      divLine = createNewElement("div", null, "line");

      if (wordsInLine == null) {
        console.log("Khi nào thì nó mới nhảy vào đây???");
        let spanWord = createNewElement("span");
        spanWord.setAttribute("class", "not-pass-word");
        spanWord.innerText = temp;
        if (spanWord.innerText.trim() == "") spanWord.innerHTML = "&nbsp;";
        divLine.appendChild(spanWord);
        div_result.appendChild(divLine);
        continue;
      }

      startWord = startLine;
      for (let j = 0; j < wordsInLine.length; j++) {
        // match(/\d+/)[0]: lấy số đầu tiên trong string này
        // VD: string này có dạng: "<123>demo " thì kết quả là 123
        // VD: string này có dạng: "<123>demo 949" thì kết quả là 123
        endWord = startWord + parseFloat(wordsInLine[j].match(/\d+/)[0]) / 1000;
        endWord = myParseFloat(endWord);

        // Do lưu time vào 2 mảng startTimes và endTimes nên việc
        // thêm attribute time-start và time-start chỉ dùng để debug
        let spanWord = createNewElement(
          "span",
          "word-" + cntWord,
          "not-pass-word",
          { "time-start": startWord, "time-end": endWord }
        );
        spanWord.innerText = wordsInLine[j].replace(/<\d+>/, "");
        if (spanWord.innerText.trim() == "") {
          spanWord.innerHTML = "&nbsp;";
          spanWord.setAttribute("is-empty", "1");
        }
        startTimes[cntWord] = startWord;
        endTimes[cntWord] = endWord;

        startWord = endWord;
        cntWord++;
        divLine.appendChild(spanWord);
      }
      div_result.appendChild(divLine);
    } else {
      if (lines[i].includes("offset:")) {
        // ex: [offset:-200]
        offsetTime = lines[i].match(/[0-9|-]+/g);
        offsetTime = parseInt(offsetTime);
      } else if (lines[i].includes("author:")) {
        // ex: [author:Tuzaku]
        lyricAuthor = lines[i].substring(
          "[author:".length,
          lines[i].length - 1
        );
      } else if (lines[i].includes("createdDate:")) {
        // ex: [createdDate:2021-06-28]
        lyricCreatedDate = lines[i].substring(
          "[createdDate:".length,
          lines[i].length - 1
        );
      }
    }
  }
  if (lyricAuthor || lyricCreatedDate) {
    divLine = createNewElement("div", null, "line");
    div_result.appendChild(divLine);
    divLine = createNewElement("div", null, "line");
    divLine.innerText = "-----------";
    div_result.appendChild(divLine);
    divLyricInfo = createNewElement("div", null, "lyric-info");
    div_result.appendChild(divLyricInfo);
  }
  if (lyricAuthor) {
    divLine = createNewElement("div", null, "line");
    divLine.innerText = "Author: " + lyricAuthor;
    divLyricInfo.appendChild(divLine);
  }
  if (lyricCreatedDate) {
    divLine = createNewElement("div", null, "line");
    divLine.innerText = "Date: " + lyricCreatedDate;
    divLyricInfo.appendChild(divLine);
  }
}

function initLrcLyric() {
  let lineTime = "",
    lineTimeLen,
    lineWords,
    startLine;
  let lineMap = new Map(); // key là 1 phần tử trong mảng startTimes
  div_result.innerHTML = "";

  for (let i = 0; i < lines.length; i++) {
    lineTime = lines[i].match(/\[\d+:\d+\.\d+\]/g);
    if (lineTime != null) {
      lineTimeLen = 0;
      for (let j = 0; j < lineTime.length; j++) {
        lineTimeLen += lineTime[j].length;
      }
      lineWords = lines[i].substring(lineTimeLen);
      for (let j = 0; j < lineTime.length; j++) {
        startLine = decodeTime(lineTime[j]);
        startTimes[cntWord] = startLine;
        lineMap.set(startLine, lineWords);
        cntWord++;
      }
    } else {
      if (lines[i].includes("offset:")) {
        offsetTime = lines[i].match(/[0-9|-]+/g);
        offsetTime = parseInt(offsetTime);
      }
    }
  }

  startTimes.sort(function (a, b) {
    return a - b;
  });

  for (let i = 0; i < startTimes.length; i++) {
    let divLine = createNewElement("div", null, "line");

    let spanWord = createNewElement("span", "word-" + i, "not-pass-word", null);
    spanWord.innerText = lineMap.get(startTimes[i]);
    if (spanWord.innerText == "") {
      spanWord.innerHTML = "&nbsp";
      spanWord.setAttribute("is-empty", "1");
    }
    divLine.appendChild(spanWord);
    div_result.appendChild(divLine);
  }

  for (let i = 0; i < startTimes.length - 1; i++) {
    endTimes[i] = startTimes[i + 1];
  }
  endTimes[startTimes.length - 1] = myAudio.duration;
}

function initSettingsAtPlayer() {
  let lyricAlign = getSetting("lyricAlign");
  if (lyricAlign) settingLyricAlign(lyricAlign);

  let isFullscreen = getSetting("fullscreen");
  if (isFullscreen) setLyricFullscreen();

  let theme = getSetting("theme");
  if (theme) {
    switch (theme) {
      case "dark":
        changeTheme("dark", "none");
        break;
      case "light":
        changeTheme("light", "none");
        break;
      case "picture-bg":
        changeTheme("picture-bg", "");
        break;
      default:
        break;
    }
  }

  setKaraokeMode(getSetting("karaokeMode"));
  setBlurMode(getSetting("blurMode"));
  setGiganticLine(getSetting("giganticLine"));
  setWordAppear(getSetting("wordAppear"));
  setPlayType(getSetting("playType"));
  setTimeout(() => {
    scrollPage(getById("lyric_playground"), 300);
  }, 10);
}

function getKaraokeWordStyle(process) {
  let isLightTheme = div_result.classList.contains("div-res-light");
  return (
    "background-image:" +
    //"-webkit-linear-gradient(top, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), " +
    "-webkit-linear-gradient(left, " +
    (isLightTheme ? "#2199F9" : "#FC0") +
    " " +
    process +
    "%, " +
    (isLightTheme ? "#333" : "#FFF") +
    " 0%)"
  );
}
function countdownAtEmptyWord(currWord) {
  let nextWord = getById("word-" + (currWordID + 1));
  if (nextWord) {
    let timeDiff = endTimes[currWordID] - startTimes[currWordID];
    let timeLeft =
      endTimes[currWordID] + offsetTime / 1000 - myAudio.currentTime;
    if (timeDiff >= 5 && timeLeft <= 5) {
      setBulletText(currWord, Math.ceil(timeLeft));
    } else if (timeDiff >= 3 && timeLeft <= 3) {
      setBulletText(currWord, Math.ceil(timeLeft));
    }
  }
}
function setBulletText(emptyWord, bullet) {
  var bulletArr = ["&nbsp;", "•", "••", "•••", "••••", "•••••"];
  emptyWord.innerHTML = bulletArr[bullet];
  fillKaraokeWord(emptyWord);
}
function runKaraokeEffect(currWord, st, en) {
  let process = ((myAudio.currentTime - st) * 100) / (en - st);
  currWord.setAttribute("style", getKaraokeWordStyle(process));
}
function fillKaraokeWord(word) {
  word.setAttribute("style", getKaraokeWordStyle(100));
}
function emptyKaraokeWord(word) {
  word.setAttribute("style", "");
}

/*
 * CHÚ Ý [1]: Nếu lyric sai thời gian:
 * VD: nếu startTimes[4] = 3, endTimes[4] = 5 và
 * startTimes[5] = 4, endTimes[5] = 6, ta thấy 2 từ này có khoảng
 * thời gian chồng lên nhau, do lỗi lyric
 * Fix: xem thêm hàm getCurrentWordByTime
 */
function updateLyric() {
  if (isNoLyric()) {
    clearPlayLyricInterval();
    return;
  }

  let prevWord, prevParent, currWord, currParent;

  // Chạy hiệu ứng karaoke cho từ hiện tại
  if (currWordID >= 0) {
    let st = startTimes[currWordID] + offsetTime / 1000;
    let en = endTimes[currWordID] + offsetTime / 1000;
    currWord = getById("word-" + currWordID);

    if (st <= myAudio.currentTime && en >= myAudio.currentTime) {
      if (div_result.classList.contains("karaoke-mode")) {
        runKaraokeEffect(currWord, st, en);
      }
      if (currWord.getAttribute("is-empty") === "1") {
        countdownAtEmptyWord(currWord);
      }

      return;
    }

    // Sau khi myAudio.currentTime nằm ngoài khoảng [st:en] thì đã đi qua
    // word hiện tại, lúc này currWord sẽ trở thành preWord
    prevWord = getById("word-" + currWordID);
    if (prevWord && prevWord.getAttribute("is-empty") === "1") {
      // Xóa bullet text ở từ trước đó, thường thì từ đó sẽ đứng trên 1 empty line
      setBulletText(prevWord, 0);
    }

    // Có thể từ trước đó mới chỉ fill 95% chẳng hạn, ta cần fill nốt từ đó
    fillKaraokeWord(prevWord);

    prevParent = prevWord.parentNode;
    if (isLrc) prevWord.classList.remove("word-active", "curr-word-lrc");
    else prevWord.classList.remove("word-active", "curr-word");
  }

  // Sau khi chạy xong hiệu ứng karaoke cho từ hiện tại, word này trở thành prevWord,
  // cần tìm currWord mới, sau đó thêm các class cho currWord, currLine,
  // các từ trước và sau currWord ở trên cùng 1 line
  currWordID = getCurrentWordByTime(myAudio.currentTime);
  if (currWordID >= 0) {
    currWord = getById("word-" + currWordID);
    currParent = currWord.parentNode;

    if (isLrc) currWord.classList.add("word-active", "curr-word-lrc");
    else currWord.classList.add("word-active", "curr-word");
    currWord.classList.remove("not-pass-word");

    if (prevParent != currParent) {
      if (prevParent != null) {
        prevParent.classList.remove("line-active");
        for (let i = 0; i < prevParent.children.length; i++) {
          if (prevParent.children[i] == prevWord) break;
          prevParent.children[i].classList.remove("word-active");
        }
      }

      currParent.classList.add("line-active");
    }

    // Active các từ trước currWord, và remove active cho các từ phía sau currWord
    let currIndex;
    for (let i = 0; i < currParent.children.length; i++) {
      if (currParent.children[i] == currWord) {
        currIndex = i;
        break;
      }
      currParent.children[i].classList.add("word-active");
    }
    for (let i = currIndex + 1; i < currParent.children.length; i++) {
      if (!currParent.children[i].classList.contains("word-active")) break;
      currParent.children[i].classList.remove("word-active");
    }

    // scroll
    if (currWord == currParent.childNodes[0]) {
      scrollLyric();
    }
  } else {
    // chạy hết nhạc thì xóa active ở dòng cuối cùng
    let finalLine = getById("word-" + (cntWord - 1)).parentNode;
    if (finalLine.classList.contains("line-active")) {
      finalLine.classList.remove("line-active");
      for (let i = 0; i < finalLine.children.length; i++) {
        finalLine.children[i].classList.remove("word-active");
      }
    }
  }
}
