const audio = document.getElementById('audio');
const btn = document.getElementById('playBtn');

btn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (error) {
    btn.textContent = 'No se pudo reproducir';
  }
});

audio.addEventListener('play', () => {
  btn.textContent = 'Ⅱ Pausar sonido';
  btn.classList.add('playing');
});

audio.addEventListener('pause', () => {
  btn.textContent = audio.currentTime > 0 ? '▶ Continuar sonido' : '▶ Escuchar su sonido';
  btn.classList.remove('playing');
});

audio.addEventListener('ended', () => {
  btn.textContent = '▶ Escuchar nuevamente';
  btn.classList.remove('playing');
});
