getById = (id) => {
  return document.getElementById(id);
}
getByClass = (className) => {
  return document.getElementsByClassName(className)[0];
}

/**
 * save setting to local storage
 */
function saveSettings(key, value) {
  let settings;
  if (localStorage && localStorage.getItem(LILIANA_SETTINGS)) {
    settings = JSON.parse(localStorage.getItem(LILIANA_SETTINGS));
    settings[key] = value;
  } else {
    settings = {
      [key]: value
    }
  }
  localStorage.setItem("LILIANA_SETTINGS", JSON.stringify(settings));
}

/**
 * get setting from local storage
 */
function getSetting(key) {
  if (localStorage && localStorage.getItem(LILIANA_SETTINGS)) {
    let settings = JSON.parse(localStorage.getItem(LILIANA_SETTINGS));
    return settings[key];
  }
  return null;
}

function getRequestParam(parameterName) {
  var result = null, tmp = [];
  location.search.substr(1).split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

function clearCountdownInterval() {
  clearInterval(countdownInterval);
  countdownInterval = null;
}

/**
 * VD: num = parseFloat("42.318")+100
 * kết quả sẽ ra là num = 142.31799999999998, chứ ko phải 142.318
 * do đó cần convert num thành số có 3 chữ số sau dấu phẩy (3 decimal places)
 **/
function myParseFloat(num) {
  return parseFloat(num.toFixed(3));
}

/**
 * Convert time stamp to seconds
 * @param {string} timestamp Lyrics time stamp, in format [2:17.88] or [1:03:45.32]
 * @return {number} Time in seconds, float number
 * Reference: https://github.com/guoyunhe/rabbit-lyrics/blob/master/src/index.js
 */
function decodeTime(timestamp) {
  if (!timestamp || typeof timestamp !== "string") return 0;
  let results;

  // [hh:mm:ss.xx] format, used by some long audio books
  results = timestamp.match(/\[(\d+):(\d+):(\d+\.\d+)\]/);
  if (results && results.length === 4) {
    return parseFloat((
      parseInt(results[1]) * 60 * 60 +
      parseInt(results[2]) * 60 +
      parseFloat(results[3])
    ).toFixed(3));
  }

  // [mm:ss.xx] format, widely used for songs
  // chú ý: regex này có 2 group: (\d+) và (\d+\.\d+)
  // do đó results sẽ là 1 mảng chứa 2 group này
  results = timestamp.match(/\[(\d+):(\d+\.\d+)\]/);
  if (results && results.length === 3) {
    return parseFloat((parseInt(results[1]) * 60 + parseFloat(results[2])).toFixed(3));
  }

  return 0;
}

/**
 * create and return new element
 * @param {string} tagName type of tag to create (ex: div, span, h1...)
 * @param {string} id id of tag
 * @param {string} classList list of classes for this tag
 * @param {JSON} attributes list of attribute this tag
 * @return {HTMLElement} element that be created
 **/
function createNewElement(tagName, id, classList, attributes = null) {
  let ele = document.createElement(tagName);

  if (id != null && typeof id === "string" && id != "") {
    ele.setAttribute("id", id);
  }
  if (classList != null && typeof classList === "string" && classList != "") {
    ele.setAttribute("class", classList);
  }
  if (attributes != null && typeof attributes === "object") {
    for (let i = 0; i < Object.keys(attributes).length; i++) {
      ele.setAttribute(Object.keys(attributes)[i], attributes[Object.keys(attributes)[i]]);
    }
  }

  return ele;
}

/**
 * Not use!
 */
function sortTable(tableId, n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableId);
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

/**
 * Filter table
 * @param {string} tableId ID of table
 * @param {integer} column The position of column we want to filter table on (first column = 0)
 * @param {string} searchText Text for filtering
 */
function filterTable(tableId, column, searchText) {
  var filter, table, tr, td, i, txtValue;
  filter = searchText.toUpperCase();
  table = document.getElementById(tableId);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[column];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/**
 * get the word base on a time, using binary search
 * Node: offsetTime will be added in this place
 * @param {float} Current time of audio in second
 * @return {Integer} id of word
 **/
function getCurrentWordByTime(sec) {
  let lo = 0, hi = cntWord - 1;
  let mid, st, en;

  while (lo <= hi) {
    mid = parseInt((lo + hi) / 2);
    st = startTimes[mid] + offsetTime / 1000;
    en = endTimes[mid] + offsetTime / 1000;

    if (st <= sec && en >= sec) {
      // fix lỗi CHÚ Ý [1]:
      // Nếu như có 2 từ có khoảng thời gian bị chồng
      // lên nhau thì ta ưu tiên từ đứng đằng sau
      st = startTimes[mid + 1] + offsetTime / 1000;
      en = endTimes[mid + 1] + offsetTime / 1000;
      if (st <= sec && en >= sec) return mid + 1;
      else return mid;
    }
    else if (st > sec) hi = mid - 1;
    else lo = mid + 1;
  }

  if (mid == 0 || mid == cntWord - 1) mid = -1;
  else {
    // ko tìm thấy thẻ nào có st <= sec <= en (do lyric bị sai).
    // tuy vậy, vẫn return thẻ gần đó nhất
    // if(mid)
    if (mid != currErrWord) {
      console.log("Cannot found a tag that the value of \"sec\" is " +
        "between its duration (st <= sec <= en). Return nearest tag: " + mid);
      toastr.warning("Warning: lyric is not correct near '" + getById("word-" + mid).innerText + "'");
      currErrWord = mid;
    }
  }

  // delete interval when finish song!
  if (sec > endTimes[cntWord - 1]) clearPlayLyricInterval();

  return mid;
}

function scrollLyric(currWord = null) {
  if (currWord == null) {
    currWord = getById("word-" + currWordID);
  }
  if (currWord != null) div_result.scrollTop = currWord.offsetTop - getById("word-0").offsetTop - div_result.offsetHeight / 2 + 50;
}

function loadLyric(elem, event) {
  // Có thể dùng tham số event để đọc:
  //var file = event.target.files[0];
  var file = elem.files[0];
  if (file == undefined) return;

  var reader = new FileReader();
  reader.onload = function (e) {
    getByClass("liliana-lyric").value = e.target.result;
  };
  reader.readAsText(file);
}

// getFormattedPassTime is a function in zuka-lyric-maker
function getFormattedPassTime(milisec) {
  // ex: 119056
  var minute = Math.floor(milisec / 60000); // 1 minute = 60000 ms
  var second = (milisec - minute * 60000) / 1000; //1 second = 1000 ms
  if (second % 1 === 0) second = second + ".000";
  return (
    "[" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second) +
    "]"
  ); // ex: [01:59.056]
}

/**
 * @param {string} lyricString ex:  `
 * [02:43.06]Cause your love
 * [02:44.04]is so sweet
 * [02:45.21]You are my everything`;
 * @param {float} offset an off set in second, ex: -1.52
 */
function addStartTimeOffsetToLrcLyric(lyricString, offset) {
  let newLyric = "";
  let lines = lyricString.trim().split("\n");
  for (let i = 0; i < lines.length; i++) {
    let startTime = lines[i].substring(0, lines[i].indexOf("]") + 1);
    let oldTime = decodeTime(startTime);

    // myParseFloat is a function in liliana-player
    let newTime = myParseFloat(oldTime + offset);

    // getFormattedPassTime is a function in zuka-lyric-maker
    let newLine =
      getFormattedPassTime(newTime * 1000) +
      lines[i].substring(lines[i].indexOf("]") + 1);
    newLyric += newLine + "\n";
  }

  return newLyric;
}

/**
 * fix error in trc lyric, example: startTimes[32] = 33.31, but
 * endTimes[31] = 33.031, and normally, they have to be identical.
 * This error comes from my mistake in zuka-lyric-maker app, due to my
 * mistake in some calculations. Although now I fixed the error for this app,
 * but some of my old lyric files are still got that error and this function
 * is just used for them (these old lyric files).
 *
 * How to fix: Ex:
 * lines[16]: [00:29.171]<201>Gượng <175>cười <228>không <560>nói <407>cho <260>lòng <623>vấn <1406>vương
 * lines[17]: [00:33.310]<207>Rời <216>vòng <221>tay <518>cuối <507>thơm <222>mùi <706>tóc <523>em <458>như <237>hôm <512>nào
 *
 * Từ "vương" là word-31, "Rời" là word-32,
 * startTimes[32] = 33.31, endTimes[31] = 33.031, diff = 33.31 - 33.031 = 0.279s = 279ms
 *
 * Hiện tại lỗi này mới chỉ xảy ra với từ đầu tiên của 1 line, do đó đầu tiên sẽ check:
 * if(startTimes[i] != endTimes[i-1]), thì từ thứ i (i = 32) bị lỗi, giờ cần tìm line chứa từ này.
 * Sau khi tìm được line đó, ta sẽ giữ nguyên các millisecond ở giữa, và cộng thêm 279 vào
 * millisecond của từ cuối cùng của line dưới, tức là từ "nào": "<512>nào" => "<791>nào",
 * đồng thời trừ 279ms vào start time của lines chứa từ lỗi đó,
 * tức là lines[17]: "[00:33.310]<207>Rời" => "[00:33.031]<207>Rời"
 */
 function fixTrcLyricError() {
  let len = startTimes.length;
  let diff = 0; // second
  let newLines = [...lines];
  let currErrLineIndex = 0;
  let temp,
    startLine,
    newStartLine,
    wordsInLine,
    timeLastWord,
    newTimeLastWord,
    lastIdx,
    lastWordPrefix;
  if (len <= 0) return;

  for (let i = 1; i < len; i++) {
    if (startTimes[i] == endTimes[i - 1]) continue;
    diff = myParseFloat(startTimes[i] - endTimes[i - 1]); // ex: 0.279

    // duyệt từng dòng để xem từ bị lỗi ("Rời") nó ở dòng nào (lines[17])
    for (let j = currErrLineIndex; j < newLines.length; j++) {
      temp = newLines[j].match(/\[\d+:\d+\.\d+\]/g); // ex: ["[00:33.310]"]

      if (temp) {
        startLine = decodeTime(temp[0]); // ex: 33.31
        if (startLine != startTimes[i]) continue;

        temp = newLines[j].substring(temp[0].length); // ex: "<207>Rời <216>vòng <221>tay <518>cuối <507>thơm
        ///////////////////////////////////////////////////// <222>mùi <706>tóc <523>em <458>như <237>hôm <512>nào"

        wordsInLine = temp.match(/<\d+>[^\<]*/g); // ex: ["<207>Rời ", "<216>vòng ", "<221>tay ", "<518>cuối ",
        ///////////////////////////////////////////////// "<507>thơm ", "<222>mùi ", "<706>tóc ", "<523>em ",
        ///////////////////////////////////////////////// "<458>như ", "<237>hôm ", "<512>nào"]

        // trừ diff vào start time của line có từ bị lỗi
        newStartLine = myParseFloat(startLine - diff); // ex: 33.031

        // cộng thêm diff vào millisecond của từ cuối cùng của line có từ bị lỗi
        lastIdx = wordsInLine.length - 1;
        timeLastWord = parseInt(wordsInLine[lastIdx].match(/\d+/)[0]); // ex: 512
        lastWordPrefix = wordsInLine[lastIdx].match(/<\d+>/g)[0]; // ex: "<512>"
        newTimeLastWord = timeLastWord + diff * 1000; // ex: 791
        wordsInLine[lastIdx] =
          "<" +
          newTimeLastWord +
          ">" +
          wordsInLine[lastIdx].substring(lastWordPrefix.length); // ex: "<791>nào"

        newLines[j] =
          getFormattedPassTime(newStartLine * 1000) + wordsInLine.join("");

        currErrLineIndex = j;
        break;
      }
    }
  }

  downloadText(newLines.join("\n"));
}

function downloadText(text) {
  var a = document.body.appendChild(document.createElement("a"));
  a.download = lyricFile;
  a.href = "data:text/plain," + text;
  a.click(); // Trigger a click on the element

  // don't need to keep this element on our page
  document.body.removeChild(a);
}
