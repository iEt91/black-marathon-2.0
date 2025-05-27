let endingTime = new Date(Date.now() + 60 * 60 * 1000); // 1h inicial

function addSeconds(sec) {
    endingTime = new Date(endingTime.getTime() + sec * 1000);
    console.log(`[Timer] +${sec}s -> Nueva hora de finalización: ${endingTime.toISOString()}`);
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

module.exports = { addSeconds, getRemaining, getFormatted };
