let timer;          // To hold the timer interval
let elapsedTime = 0; // To store elapsed time in milliseconds
let isRunning = false; // To check if stopwatch is running
let startTime;      // To store the start time
let lapCounter = 0; // To count laps

// Function to format time from milliseconds to HH:MM:SS
function formatTime(ms) {
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((ms % 1000) / 10);

  // Pad the values to always display two digits
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Function to start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      document.getElementById("display").textContent = formatTime(elapsedTime);
    }, 10); // Update the display every 10ms
  }
}

// Function to stop the stopwatch
function stopStopwatch() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00:00";
  document.getElementById("laps").innerHTML = ""; // Clear laps
  lapCounter = 0; // Reset lap counter
}

// Function to record a lap time
function lapTime() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapList = document.getElementById("laps");
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${++lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}
