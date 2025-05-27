function updateTime() {
    fetch("/time")
        .then(res => res.text())
        .then(time => {
            document.getElementById("timeText").innerText = time;
        })
        .catch(err => {
            console.error("Error al obtener el tiempo:", err);
        });
}

updateTime(); // llamada inicial
setInterval(updateTime, 900); // actualización continua cada 0.9s
