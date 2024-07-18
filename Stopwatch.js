let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const intervalsList = document.getElementById('intervalsList');

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startTime = null;
    difference = null;
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    display.innerHTML = '00:00:00.000';
    lapsList.innerHTML = '';
    intervalsList.innerHTML = '';
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function recordLap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.innerText = `Lap ${lapCounter}: ${display.innerHTML}`;
    lapsList.appendChild(lapTime);
    
    const intervalTime = document.createElement('li');
    intervalTime.innerText = `Interval ${lapCounter}: ${display.innerHTML}`;
    intervalsList.appendChild(intervalTime);
}
