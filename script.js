let timerInterval;
let startTime;
let pausedTime = 0;
let running = false;
let laps = [];

const timerDisplay = document.querySelector('.timer-Display');
const startButton = document.getElementById('startTimer');
const pauseButton = document.getElementById('pauseTimer');
const resetButton = document.getElementById('resetTime');
const restartButton = document.getElementById('restartTimer');
const lapButton = document.getElementById('lap');
const resetLapButton = document.getElementById('resetLap');
const lapsList = document.getElementById('laps');

// Function to format time as hh:mm:ss:ms
function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    let ms = milliseconds % 1000;

    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} : ${ms.toString().padStart(3, '0')}`;
}

// Function to start the timer
function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - pausedTime;
        timerInterval = setInterval(updateTimer, 10);
    }
}

// Function to pause the timer
function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
        pausedTime = Date.now() - startTime;
    }
}

// Function to update the timer display
function updateTimer() {
    let elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    pausedTime = 0;
    running = false;
    timerDisplay.textContent = '00 : 00 : 00 : 000';
    laps = [];
    while (lapsList.firstChild) {
        lapsList.removeChild(lapsList.firstChild);
    }
}

// Function to restart the timer
function restartTimer() {
    resetTimer();
    startTimer();
}

// Function to record a lap
function recordLap() {
    if (running) {
        let elapsedTime = Date.now() - startTime;
        laps.push(formatTime(elapsedTime));
        let lapItem = document.createElement('li');
        lapItem.textContent = formatTime(elapsedTime);
        lapsList.appendChild(lapItem);
    }
}

// Function to reset laps
function resetLaps() {
    laps = [];
    while (lapsList.firstChild) {
        lapsList.removeChild(lapsList.firstChild);
    }
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
restartButton.addEventListener('click', restartTimer);
lapButton.addEventListener('click', recordLap);
resetLapButton.addEventListener('click', resetLaps);
