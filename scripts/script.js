// Pomodoro timer script file for Odin project
const sessionTime = document.querySelector("#session-digits");
const breakTime = document.querySelector("#break-digits");
const mainTime = document.querySelector("#main-timer");
let sessionNum = 25;
let breakNum = 5;
let inSession = false;
let pausedStatus = false;
let isRunning = false;
let runningTime = 0;
let counter;

function performAction(e) {
  const actionType = e.target.parentElement.id;
  switch (actionType) {
    case "decrease-session":
    case "increase-break":
      if (sessionNum > 1) {
        sessionNum--;
        breakNum++;
        displaySession();
      }
      break;
    case "increase-session":
    case "decrease-break":
      if (sessionNum < 29) {
        sessionNum++;
        breakNum--;
        displaySession();
      }
      break;
    case "play-button":
      if (!pausedStatus) {
        inSession = true;
        isRunning = true;
        runningTime = sessionNum * 60;
        startSession();
      } else {
        pausedStatus = false;
        startSession();
      }
      break;
    case "reset-button":
      inSession = false;
      pausedStatus = false;
      isRunning = false;
      sessionNum = 25;
      breakNum = 5;
      displaySession();
      clearInterval(counter);
      break;
    case "stop-button":
      inSession = false;
      pausedStatus = false;
      isRunning = false;
      mainTime.style.color = "lightgreen";
      displaySession();
      clearInterval(counter);
      break;
    case "pause-button":
      pausedStatus = true;
      clearInterval(counter);
      break;
  }
}

function startSession() {
  counter = setInterval(() => {
    runningTime--;
    displayCounter(runningTime);
    if (runningTime <= 0) {
      inSession
        ? (runningTime = breakNum * 60)
        : (runningTime = sessionNum * 60);
      inSession = !inSession;
    }
  }, 1000);
}

function displayCounter(time) {
  let secs = time % 60;
  let mins = (time - secs) / 60;
  let formatSecs = secs.toString().length > 1 ? secs : "0" + secs;
  let formatMins = mins.toString().length > 1 ? mins : "0" + mins;
  let colourDisplay;
  let currentTarget;

  inSession
    ? (currentTarget = sessionNum * 60)
    : (currentTarget = breakNum * 60);

  if (time < currentTarget * 0.1) {
    colourDisplay = "red";
  } else if (time < currentTarget * 0.2) {
    colourDisplay = "yellow";
  } else {
    colourDisplay = "lightgreen";
  }
  mainTime.style.color = colourDisplay;
  mainTime.textContent = formatMins + ":" + formatSecs;
}

function displaySession() {
  sessionTime.textContent = sessionNum;
  breakTime.textContent = breakNum;
  mainTime.textContent =
    sessionNum.toString().length > 1
      ? sessionNum + ":00"
      : "0" + sessionNum + ":00";
}

const buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => {
  button.addEventListener("click", performAction);
});
