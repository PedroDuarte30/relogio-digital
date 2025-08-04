let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

function updateClock() {
    let currentTime = new Date();

    //Função para garantir dois digitos 
    const format = (value) => value.toString().padStart(2, "0");

    hours.innerHTML = format(currentTime.getHours());
    minutes.innerHTML = format(currentTime.getMinutes());
    seconds.innerHTML = format(currentTime.getSeconds());
}

//Atualiza o relógio ao carregar a página
updateClock();

//Atualiza a cada segundo
setInterval(updateClock, 1000);



