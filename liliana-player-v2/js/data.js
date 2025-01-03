function saveSettingFromParams() {
  let lyricAlign = getRequestParam("lyricAlign");
  if(lyricAlign) saveSettings("lyricAlign", lyricAlign);

  let theme = getRequestParam("theme");
  if(theme) saveSettings("theme", theme);

  let karaokeMode = getRequestParam("karaokeMode");
  if (karaokeMode) {
    saveSettings("karaokeMode", convertBoolean(karaokeMode));
  }

  let blurMode = getRequestParam("blurMode");
  if (blurMode) saveSettings("blurMode", convertBoolean(blurMode));

  let wordAppear = getRequestParam("wordAppear");
  if (wordAppear) saveSettings("wordAppear", convertBoolean(wordAppear));

  let fullscreen = getRequestParam("fullscreen");
  if (fullscreen) saveSettings("fullscreen", convertBoolean(fullscreen));
}

function convertBoolean(text) {
  if(text && text.trim() === "true") return true;
  return false;
}

function showTable(sort_by, sort_order, callback) {
  let sortBy = sort_by != null ? sort_by : getRequestParam("sortBy");
  let sortOrder = sort_order != null ? sort_order : getRequestParam("sortOrder");

  if (sortBy !== null && sortBy.trim() !== "") {
    saveSettings("sortBy", sortBy);
  } else {
    sortBy = getSetting("sortBy");
    if (sortBy == null) sortBy = "";
  }

  if (sortOrder !== null && sortOrder.trim() !== "") {
    saveSettings("sortOrder", sortOrder);
  } else {
    sortOrder = getSetting("sortOrder");
    if (sortOrder == null) sortOrder = "";
  }

  let urlAllSongs = HOST_API + "/api/song/all?sortBy=" + sortBy + "&sortOrder=" + sortOrder;
  $.ajax({
    url: urlAllSongs
  }).then(json => {
    playList = json;
    createSongTable(json);
    if(callback) callback();
  });
}

function showAllSongs(sort_by, sort_order) {
  showTable(sort_by, sort_order, () => {
    let file = getRequestParam("file");
    if (!activeAudio) {
      for (let i = 0; i < playList.length; i++) {
        if (playList[i].fileName === file) {
          activeAudio = i;
          playedList.push(activeAudio);
          break;
        }
      }
    }
    showAudioMetadata(getLyric.bind(null, file));
  })
}

function createSongTable(json) {
  let all_songs = getById("all_songs");
  all_songs.innerHTML = "";

  /**************** search/filter ****************/
  let searchWrapper = createNewElement("div", null, "search-wrapper");
  all_songs.appendChild(searchWrapper);

  let allSongInputFilter = createNewElement("input", null, "input-text all-song-input", { "placeholder": "Search by title/artist" });
  searchWrapper.appendChild(allSongInputFilter);
  let clearFilter = createNewElement("i", null, "fa fa-times btn-clear-filter", { "title": "Clear", "style": "display:none" });
  searchWrapper.appendChild(clearFilter);
  allSongInputFilter.addEventListener("keyup", function () {
    if (this.value === "") {
      clearFilter.style.display = "none";
    } else {
      clearFilter.style.display = "";
    }
    filterTable("songTable", 1, this.value);
  });
  clearFilter.onclick = () => {
    allSongInputFilter.value = "";
    clearFilter.style.display = "none";
    filterTable("songTable", 1, "");
  }

  /**************** table ****************/
  let cntSong = 1;
  let allSongValue = createNewElement("div", null, "all-song-value custom-scrollbar");
  let tableTag = createNewElement("table", null, "table_striped", { id: "songTable", cellspacing: "0", cellpadding: "0" });
  let tdTag, trTag, aTag, iTag, imgTag, imgUrl;

  // table headers
  trTag = createNewElement("tr");
  trTag.innerHTML = "<th style='text-align: right;'>No.</th>" +
    "<th style='cursor: pointer;min-width: 220px;' onclick=\"showTable('title', 'ASC')\">Song</th>" +
    "<th style='cursor: pointer;' onclick=\"showTable('listens', 'DESC')\">Listens</th>" +
    "<th style='cursor: pointer;' onclick=\"showTable('type', 'ASC')\">Type</th>" +
    "<th style='cursor: pointer;' onclick=\"showTable('createdDate', 'DESC')\">Date</th>";
  tableTag.appendChild(trTag);

  for (let i = 0; i < json.length; i++) {
    // First cell of each row
    tdTag = createNewElement("td");
    tdTag.innerText = cntSong++;
    let trTag = createNewElement("tr");
    trTag.appendChild(tdTag);

    // Second cell of each row
    imgUrl = json[i].imageUrl != null ? HOST_API + json[i].imageUrl : "./images/music_icon.jpg";
    tdTag = createNewElement("td", null, "td-song-info");
    imgTag = createNewElement("img", null, "song-picture", { "src": imgUrl });
    tdTag.appendChild(imgTag);
    aTag = createNewElement("a", null, "song-item", { "href": "?file=" + json[i].fileName });
    aTag.innerHTML = "<div class='song-title'>" + (json[i].title != null && json[i].title != "" ? json[i].title : "(Unknown)") + "</div>" +
      "<div class='song-artist'>" + (json[i].artist != null && json[i].artist != "" ? json[i].artist : "(Unknown)") + "</div>";
    aTag.addEventListener("click", function (e) {
      e.preventDefault();
      let file = getRequestParam("file");
      if (file && this.getAttribute("href") === "?file=" + file) {
        if (myAudio.paused) {
          playAudio();
        } else {
          pauseAudio();
        }
      } else {
        window.history.pushState(null, null, this.getAttribute("href"));
        activeAudio = i;
        addToPlayedList();
        playSong(true);
      }
    });
    tdTag.appendChild(aTag);
    iTag = createNewElement("i", null, "icon-play", null);
    tdTag.appendChild(iTag);
    trTag.appendChild(tdTag);

    // Third cell of each row
    tdTag = createNewElement("td");
    tdTag.innerText = json[i].listens;
    trTag.appendChild(tdTag);

    // Fourth cell of each row
    tdTag = createNewElement("td");
    tdTag.innerText = json[i].type;
    trTag.appendChild(tdTag);

    // Fifth cell of each row
    tdTag = createNewElement("td");
    tdTag.innerText = json[i].formatCreatedDate;
    trTag.appendChild(tdTag);

    tableTag.appendChild(trTag);
  }
  allSongValue.appendChild(tableTag);
  all_songs.appendChild(allSongValue);

  let file = getRequestParam("file");
  if (file) {
    activeTr(file, false);
  }
}

function activeTr(file, isClicked) {
  let songTable = getById("songTable");
  if (!songTable) return;
  let allSongValue = getByClass('all-song-value');
  let childNodes = songTable.childNodes;
  for (let i = 1; i < childNodes.length; i++) {
    songTable.childNodes[i].classList.remove("tr-active");
    if (songTable.childNodes[i].childNodes[1].childNodes[1].getAttribute("href") === "?file=" + file) {
      songTable.childNodes[i].classList.add("tr-active");
      if (!isClicked) {
        // 41.33px = height of table header
        allSongValue.scrollTop = songTable.childNodes[i].offsetTop - 41.33;
      }
    }
  }
}
