let endingTime = null;
let isPausedFlag = false;

function syncTime() {
  fetch("/time")
    .then(res => res.json())
    .then(data => {
      endingTime = new Date(data.endingTime);
      isPausedFlag = data.paused;
    })
    .catch(err => {
      console.error("Error al sincronizar tiempo:", err);
    });
}

function renderClock() {
  if (!endingTime) return;

  const now = new Date();
  const diff = Math.max(0, Math.floor((endingTime - now) / 1000));

  if (!isPausedFlag) {
    const h = String(Math.floor(diff / 3600)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const s = String(diff % 60).padStart(2, '0');
    document.getElementById("timeText").innerText = `${h}:${m}:${s}`;
  }
}

syncTime();
setInterval(renderClock, 1000);
setInterval(syncTime, 3000);
