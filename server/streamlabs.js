const socketIo = require("socket.io-client");
const tmi = require("tmi.js");
const {
    addSeconds,
    setEndingTimeFromNow,
    pauseTimer,
    resumeTimer
} = require("./timer");

function initStreamlabs() {
    const token = process.env.STREAMLABS_TOKEN;
    if (!token) {
        console.error("❌ STREAMLABS_TOKEN no definido en .env");
        return;
    }

    // Suscripciones, bits y donaciones de blackelespanolito
    const streamlabsSocket = socketIo(`https://sockets.streamlabs.com?token=${token}`, {
        transports: ["websocket"],
    });

    streamlabsSocket.on("connect", () => {
        console.log("✅ Conectado a Streamlabs para eventos de blackelespanolito");
    });

    streamlabsSocket.on("event", (event) => {
        if (!event?.type || !event.message) return;
        const msg = event.message[0];

        switch (event.type) {
            case "subscription":
            case "resub":
                addSeconds(180);
                break;

            case "donation":
                const amount = parseFloat(msg.amount);
                if (!isNaN(amount) && amount >= 1) {
                    const extra = Math.floor(amount);
                    addSeconds(extra * 40); // $1 = 40s
                }
                break;

            case "cheer":
                const bits = parseInt(msg.bits);
                if (!isNaN(bits) && bits >= 500) {
                    const units = Math.floor(bits / 500);
                    addSeconds(units * 180); // 500 bits = 180s
                }
                break;

            case "gift":
                const count = parseInt(msg.count || 1);
                if (!isNaN(count) && count > 0) {
                    addSeconds(count * 180);
                }
                break;
        }

        console.log(`[Streamlabs] Evento de ${event.type} procesado`);
    });

    // Comandos de prueba desde el canal tangov91
    const twitchClient = new tmi.Client({
        channels: ["tangov91"]
    });

    twitchClient.connect().catch(console.error);

    twitchClient.on("message", (channel, tags, message, self) => {
        if (self) return;
        const isMod = tags.mod || tags.username === "blackelespanolito";
        const parts = message.trim().split(" ");

        if (!isMod) return;

        if (parts[0] === "!settime" && parts.length === 4) {
            const h = parseInt(parts[1]);
            const m = parseInt(parts[2]);
            const s = parseInt(parts[3]);
            if (!isNaN(h) && !isNaN(m) && !isNaN(s)) {
                setEndingTimeFromNow(h, m, s);
                console.log(`[Twitch@${channel}] settime por ${tags.username}: ${h}h ${m}m ${s}s`);
            }
        }

        if (parts[0] === "!pause") {
            pauseTimer();
            console.log(`[Twitch@${channel}] pause por ${tags.username}`);
        }

        if (parts[0] === "!resume") {
            resumeTimer();
            console.log(`[Twitch@${channel}] resume por ${tags.username}`);
        }
    });
}

module.exports = initStreamlabs;
