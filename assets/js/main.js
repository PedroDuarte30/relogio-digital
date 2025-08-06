// Referências ao DOM — usar const porque não vamos reatribuir
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timeElement = document.getElementById("digital-clock"); // para atualizar datetime

// Formata para dois dígitos
const format = (value) => value.toString().padStart(2, "0");

// Atualiza os elementos com a hora atual
function updateClock() {
  const now = new Date();

  hours.textContent = format(now.getHours());
  minutes.textContent = format(now.getMinutes());
  seconds.textContent = format(now.getSeconds());

  // Atualiza também o atributo datetime do <time> (formato HH:MM:SS)
  if (timeElement) {
    timeElement.setAttribute('datetime', `${format(now.getHours())}:${format(now.getMinutes())}:${format(now.getSeconds())}`);
  }
}

// Função que executa o tick sincronizado com o segundo real (evita drift)
function startClock() {
  updateClock(); // primeira chamada imediata

  // calcula quantos ms faltam até ao início do próximo segundo
  const msUntilNextSecond = 1000 - (Date.now() % 1000);

  // espera até ao próximo segundo exato, e depois usa setInterval 1000ms
  setTimeout(() => {
    updateClock();
    // guarda o id se quiseres limpar mais tarde
    const intervalId = setInterval(updateClock, 1000);

    // opcional: armazenar intervalId em window para poder parar mais tarde
    window._clockIntervalId = intervalId;
  }, msUntilNextSecond);
}

// Page Visibility API: para poupar CPU quando a aba não está visível
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // reinicia relógio quando volta a ficar visível
    startClock();
  } else {
    // limpar o interval para poupar recursos
    if (window._clockIntervalId) {
      clearInterval(window._clockIntervalId);
      window._clockIntervalId = null;
    }
  }
});

// Iniciar o relógio no carregamento do script
startClock();
