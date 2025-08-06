const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timeElement = document.getElementById("digital-clock"); // para atualizar datetime

const format = (value) => value.toString().padStart(2, "0");

function updateClock() {
  const now = new Date();

  hours.textContent = format(now.getHours());
  minutes.textContent = format(now.getMinutes());
  seconds.textContent = format(now.getSeconds());

  if (timeElement) {
    timeElement.setAttribute('datetime', `${format(now.getHours())}:${format(now.getMinutes())}:${format(now.getSeconds())}`);
  }
}


function startClock() {
  updateClock(); 

  const msUntilNextSecond = 1000 - (Date.now() % 1000);

  setTimeout(() => {
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    window._clockIntervalId = intervalId;
  }, msUntilNextSecond);
}


document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startClock();
  } else {
    if (window._clockIntervalId) {
      clearInterval(window._clockIntervalId);
      window._clockIntervalId = null;
    }
  }
});

startClock();
