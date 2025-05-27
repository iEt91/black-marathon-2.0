let endingTime = new Date(Date.now() + 60 * 60 * 1000); // 1h inicial
let paused = false;
let accumulatedSeconds = 0;
let pauseStart = null;

function addSeconds(sec) {
  if (paused) {
    accumulatedSeconds += sec;
    console.log(`[Timer] +${sec}s acumulado (pausado)`);
  } else {
    endingTime = new Date(endingTime.getTime() + sec * 1000);
    console.log(`[Timer] +${sec}s añadido. Nuevo fin: ${endingTime.toISOString()}`);
  }
}

function setEndingTimeFromNow(h, m, s) {
  const totalMs = ((h * 3600) + (m * 60) + s) * 1000;
  endingTime = new Date(Date.now() + totalMs);
  accumulatedSeconds = 0;
  paused = false;
  pauseStart = null;
  console.log(`[Timer] Tiempo manual: ${endingTime.toISOString()}`);
}

function pauseTimer() {
  if (!paused) {
    paused = true;
    pauseStart = new Date();
    console.log("[Timer] ⏸️ Pausado");
  }
}

function resumeTimer() {
  if (paused) {
    const now = new Date();
    const pausedDuration = Math.floor((now - pauseStart) / 1000);
    endingTime = new Date(endingTime.getTime() + pausedDuration * 1000 + accumulatedSeconds * 1000);
    console.log(`[Timer] ▶️ Reanudado (+${pausedDuration}s de pausa +${accumulatedSeconds}s acumulado)`);
    accumulatedSeconds = 0;
    paused = false;
    pauseStart = null;
  }
}

function getRemaining() {
  const now = new Date();

  if (paused && pauseStart) {
    return Math.max(0, Math.floor((endingTime - pauseStart) / 1000));
  } else {
    return Math.max(0, Math.floor((endingTime - now) / 1000));
  }
}

function getFormatted() {
  const total = getRemaining();
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getEndingTimeISO() {
  const now = new Date();
  if (paused && pauseStart) {
    const diff = endingTime - pauseStart;
    return new Date(now.getTime() + diff).toISOString(); // congelado
  }
  return endingTime.toISOString();
}

function isPaused() {
  return paused;
}

module.exports = {
  addSeconds,
  setEndingTimeFromNow,
  pauseTimer,
  resumeTimer,
  getRemaining,
  getFormatted,
  getEndingTimeISO,
  isPaused
};
