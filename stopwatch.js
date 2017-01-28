window.onload = initialize;
function initialize() {
    document.getElementById('startButton').onclick=toggle;
    document.getElementById('resetButton').onclick=reset;
    startBlink();
}

// ----- Stopwatch -----

var ongoing = false;
var displayTime;
var startTime;
var offset = 0;
var watchInterval;

function toggle() {
    ongoing = !ongoing;
    if(ongoing){
        stopBlink();
        startWatch();
    }else{
        startBlink();
        stopWatch();
    }
}

function reset() {
    startTime = undefined;
    offset = 0;
    document.getElementById('hour').innerHTML= '00';
    document.getElementById('minute').innerHTML= '00';
    document.getElementById('second').innerHTML= '00';
    document.getElementById('millisecond').innerHTML= '000';
}

function startWatch(){
    updateWatch();
    watchInterval = setInterval("updateWatch()", 50);
}

function updateWatch() {
    document.getElementById('startButton').innerHTML= 'Stop';
    if(startTime === undefined){
        startTime = new Date().getTime();
    }
    displayTime = new Date().getTime() - startTime + offset;
    var sec = Math.floor(displayTime / 1000) % 60;
    var min = Math.floor(displayTime / 1000 / 60) % 60;
    var hour = Math.floor(displayTime / 1000 / 60 / 60);

    console.log(sec);

    document.getElementById('hour').innerHTML= ("00" + hour).slice(-2);
    document.getElementById('minute').innerHTML= ("00" + min).slice(-2);
    document.getElementById('second').innerHTML= ("00" + sec).slice(-2);
}

function stopWatch() {
    document.getElementById('startButton').innerHTML= 'Start';
    clearInterval(watchInterval);
    startTime = undefined;
    offset = displayTime;
}

// ----- Blink -----

var $WHITE = '#F44336';
var $BLACK = '#EF9A9A';
var $GREEN = '#8BC34A'
var $prev_color = '';
var $blinkTimer;

function startBlink(){
    blink();
    $blinkTimer = setInterval("blink()", 1000);
}

function stopBlink(){
    clearInterval($blinkTimer);
    $blinkTimer = undefined;
    $prev_color = '';
    changeBackground($GREEN);
}

function blink() {
    if ($prev_color == $WHITE) {
        changeBackground($BLACK);
        $prev_color = $BLACK;
    } else {
        changeBackground($WHITE);
        $prev_color = $WHITE;
    }
}

function changeBackground(color) {
    document.body.style.background = color;
}
