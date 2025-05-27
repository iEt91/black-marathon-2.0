let endingTime = new Date(Date.now() + 60 * 60 * 1000); // 1h inicial
let isPaused = false;
let accumulatedSeconds = 0;

function addSeconds(sec) {
    if (isPaused) {
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
    console.log(`[Timer] Tiempo establecido manualmente: ${endingTime.toISOString()}`);
}

function pauseTimer() {
    if (!isPaused) {
        isPaused = true;
        console.log("[Timer] ⏸️ Contador pausado");
    }
}

function resumeTimer() {
    if (isPaused) {
        endingTime = new Date(endingTime.getTime() + accumulatedSeconds * 1000);
        accumulatedSeconds = 0;
        isPaused = false;
        console.log("[Timer] ▶️ Contador reanudado");
    }
}

function getRemaining() {
    const now = new Date();
    return Math.max(0, Math.floor((endingTime - now) / 1000));
}

function getFormatted() {
    const total = getRemaining();
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function getEndingTimeISO() {
    return endingTime.toISOString();
}

module.exports = {
    addSeconds,
    setEndingTimeFromNow,
    pauseTimer,
    resumeTimer,
    getRemaining,
    getFormatted,
    getEndingTimeISO
};
