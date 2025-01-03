var div_result = getById("div_result");
var div_background = getById("div_background");
var left_img = getByClass("left_img");
var lines = [];
var startTimes = [];
var endTimes = [];
var myAudio = getById("myAudio");
var title, artist, album;
var lyricFile;
var currErrWord = -1;
var cntWord, currWordID;
var playLyricInterval, countdownInterval;
var offsetTime = 0; // offset time in milisecond
var playList = [];
var playedList = [];
var playType;
var activeAudio;
var btnPlayType;
var isLrc;

const LILIANA_SETTINGS = "LILIANA_SETTINGS";
const SEQUENCE = "SEQUENCE";
const SHUFFLE = "SHUFFLE";
const REPEAT_ONE = "REPEAT_ONE";
const playTypeList = [SEQUENCE, SHUFFLE, REPEAT_ONE];
const playTypeCssList = ["fa-long-arrow-right", "fa-random", "fa-repeat"];
const playTypeTitleList = ["Sequence", "Shuffle", "Repeat one"];
const playTypeSvgList = [BTN_SEQUENCE_SVG, BTN_SHUFFLE_SVG, BTN_REPEAT_ONE_SVG];
const NO_LYRIC = `Sorry! This song has no lyric yet! You can contribute lyric by
  sending it to me:<br/><a href='mailto:taanhtu95@gmail.com'>Mail</a><br/>
  <a href='https://fb.com/anhtuta95' target='_blank'>FB</a>`;
const DEFAULT_MEDIA_SESSION_IMAGE = "https://anhtuta.github.io/liliana-player-v2/images/favicon.png";
