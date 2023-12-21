const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');
// const reset = document.querySelector('li');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);

function startTimer(){
    interval = setInterval(updateTimer,10);
    startButton.disabled = true;
    stopButton.disabled = false;
    pauseButton.disabled = false;
    resetButton.disabled = false;
}
function stopTimer(){
    clearInterval(interval);
    addToLapList();
    // resetTimerData();
    stopButton.disabled = true;
    startButton.disabled = false;
}
function pauseTimer(){
    clearInterval(interval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}
function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    
    resetButton.disabled = true;
}

function updateTimer(){
    milliseconds++;
    if(milliseconds === 100){
        milliseconds =0 ;
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}


function displayTimer(){
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time){
    return time.toString().padStart(2,'0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
    // resetList();
}

// function resetList(){
//     if (resetButton) {
//         addToLapList().style.display = 'none';
//     }
// }

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`; 

    const listItem = document.createElement('li');

    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span> ${lapTime}`;

    lapList.appendChild(listItem);
}

