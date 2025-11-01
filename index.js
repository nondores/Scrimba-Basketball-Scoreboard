// --- Score Variables ---
let homeScore = 0;
let guestScore = 0;
let homeFouls = 0;
let guestFouls = 0;
let period = 1;

// --- Timer Variables ---
let timer;
let totalSeconds = 600; // 10 minutes
let isRunning = false;

// --- Elements ---
const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");
const homeFoulsEl = document.getElementById("home-fouls");
const guestFoulsEl = document.getElementById("guest-fouls");
const periodEl = document.getElementById("period-number");
const timerDisplay = document.getElementById("timer-display");

// --- Buttons ---
const newGameBtn = document.getElementById("new-game");

// --- Functions ---
// Update scoreboard display
function updateDisplay() {
  homeScoreEl.textContent = homeScore;
  guestScoreEl.textContent = guestScore;
  homeFoulsEl.textContent = homeFouls;
  guestFoulsEl.textContent = guestFouls;
  periodEl.textContent = period;
  updateLeader();
}

// Highlight leader
function updateLeader() {
  const homeTeam = document.querySelector(".home");
  const guestTeam = document.querySelector(".guest");

  homeTeam.classList.remove("leading", "tie");
  guestTeam.classList.remove("leading", "tie");

  if (homeScore > guestScore) {
    homeTeam.classList.add("leading");
  } else if (guestScore > homeScore) {
    guestTeam.classList.add("leading");
  } else {
    homeTeam.classList.add("tie");
    guestTeam.classList.add("tie");
  }
}

// Format timer
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Update timer display
function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(totalSeconds);
}

// Timer control
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  pauseTimer();
  totalSeconds = 600; // back to 10:00
  updateTimerDisplay();
}

// --- Event Listeners ---
// Add points
document.getElementById("home-add-1").onclick = () => { homeScore += 1; updateDisplay(); };
document.getElementById("home-add-2").onclick = () => { homeScore += 2; updateDisplay(); };
document.getElementById("home-add-3").onclick = () => { homeScore += 3; updateDisplay(); };

document.getElementById("guest-add-1").onclick = () => { guestScore += 1; updateDisplay(); };
document.getElementById("guest-add-2").onclick = () => { guestScore += 2; updateDisplay(); };
document.getElementById("guest-add-3").onclick = () => { guestScore += 3; updateDisplay(); };

// Add fouls
document.getElementById("home-foul-add").onclick = () => { homeFouls += 1; updateDisplay(); };
document.getElementById("guest-foul-add").onclick = () => { guestFouls += 1; updateDisplay(); };

// Period control
document.getElementById("period-increase").onclick = () => { period += 1; updateDisplay(); };

// Timer buttons
document.getElementById("start-timer").onclick = startTimer;
document.getElementById("pause-timer").onclick = pauseTimer;
document.getElementById("reset-timer").onclick = resetTimer;

// New game button
newGameBtn.onclick = () => {
  pauseTimer();
  homeScore = 0;
  guestScore = 0;
  homeFouls = 0;
  guestFouls = 0;
  period = 1;
  totalSeconds = 600;
  updateTimerDisplay();
  updateDisplay();
};

// Initialize display
updateTimerDisplay();
updateDisplay();
