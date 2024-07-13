let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('time-display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10); // Update interval set to 10ms for better precision
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00.00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${++lapCounter}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}
