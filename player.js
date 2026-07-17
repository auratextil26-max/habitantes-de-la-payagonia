/* =====================================================
   AURA TEXTIL — REPRODUCTOR DE AUDIO PREMIUM
===================================================== */

(() => {
  function iniciarReproductorAura() {
    const audio = document.getElementById("audio");
    const boton = document.getElementById("playBtn");

    if (!audio || !boton || document.querySelector(".aura-player")) {
      return;
    }

    /* ---------- ESTILOS ---------- */

    if (!document.getElementById("aura-player-estilos")) {
      const estilos = document.createElement("style");

      estilos.id = "aura-player-estilos";

      estilos.textContent = `
        .aura-player {
          position: relative;
          z-index: 20;
          display: block;
          flex: 1 0 100%;
          width: min(480px, 100%);
          margin-top: 16px;
          padding: 16px 18px;

          background: rgba(7, 16, 11, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 18px;

          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }

        .aura-player.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .aura-player-superior {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 13px;
        }

        .aura-player-estado {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .aura-ecualizador {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 25px;
        }

        .aura-ecualizador span {
          display: block;
          width: 3px;
          height: 6px;

          background: var(--color-especie, #d7e78a);
          border-radius: 20px;

          animation: auraOnda 0.7s ease-in-out infinite alternate;
          animation-play-state: paused;
        }

        .aura-ecualizador span:nth-child(2) {
          animation-delay: 0.12s;
        }

        .aura-ecualizador span:nth-child(3) {
          animation-delay: 0.24s;
        }

        .aura-ecualizador span:nth-child(4) {
          animation-delay: 0.08s;
        }

        .aura-ecualizador span:nth-child(5) {
          animation-delay: 0.3s;
        }

        .aura-player.reproduciendo .aura-ecualizador span {
          animation-play-state: running;
        }

        @keyframes auraOnda {
          from {
            height: 5px;
            opacity: 0.55;
          }

          to {
            height: 24px;
            opacity: 1;
          }
        }

        .aura-player-texto {
          color: rgba(255, 255, 255, 0.82);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .aura-player-tiempo {
          color: rgba(255, 255, 255, 0.75);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        .aura-barra {
          position: relative;
          width: 100%;
          height: 7px;

          background: rgba(255, 255, 255, 0.17);
          border-radius: 20px;

          cursor: pointer;
          outline: none;
        }

        .aura-barra-progreso {
          width: 0%;
          height: 100%;

          background: var(--color-especie, #d7e78a);
          border-radius: inherit;

          transition: width 0.1s linear;
        }

        .aura-punto {
          position: absolute;
          top: 50%;
          left: 0%;

          width: 13px;
          height: 13px;

          background: #ffffff;
          border: 3px solid var(--color-especie, #d7e78a);
          border-radius: 50%;

          transform: translate(-50%, -50%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);

          transition: left 0.1s linear;
        }

        @media (max-width: 700px) {
          .aura-player {
            width: 100%;
            padding: 14px 15px;
            border-radius: 15px;
          }

          .aura-player-texto {
            font-size: 9px;
          }

          .aura-player-tiempo {
            font-size: 10px;
          }
        }
      `;

      document.head.appendChild(estilos);
    }

    /* ---------- CREAR REPRODUCTOR ---------- */

    const reproductor = document.createElement("div");

    reproductor.className = "aura-player";

    reproductor.innerHTML = `
      <div class="aura-player-superior">

        <div class="aura-player-estado">

          <div class="aura-ecualizador" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <span class="aura-player-texto">
            Paisaje sonoro
          </span>

        </div>

        <div class="aura-player-tiempo">
          <span class="aura-tiempo-actual">00:00</span>
          /
          <span class="aura-tiempo-total">00:00</span>
        </div>

      </div>

      <div
        class="aura-barra"
        role="slider"
        tabindex="0"
        aria-label="Progreso del sonido"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="0"
      >
        <div class="aura-barra-progreso"></div>
        <div class="aura-punto"></div>
      </div>
    `;

    boton.insertAdjacentElement("afterend", reproductor);

    const tiempoActual =
      reproductor.querySelector(".aura-tiempo-actual");

    const tiempoTotal =
      reproductor.querySelector(".aura-tiempo-total");

    const barra =
      reproductor.querySelector(".aura-barra");

    const progreso =
      reproductor.querySelector(".aura-barra-progreso");

    const punto =
      reproductor.querySelector(".aura-punto");

    /* ---------- FUNCIONES ---------- */

    function formatearTiempo(segundos) {
      if (!Number.isFinite(segundos)) {
        return "00:00";
      }

      const minutos = Math.floor(segundos / 60);
      const resto = Math.floor(segundos % 60);

      return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(resto).padStart(2, "0")
      );
    }

    function actualizarDuracion() {
      tiempoTotal.textContent = formatearTiempo(audio.duration);
    }

    function actualizarProgreso() {
      const porcentaje =
        audio.duration > 0
          ? (audio.currentTime / audio.duration) * 100
          : 0;

      progreso.style.width = `${porcentaje}%`;
      punto.style.left = `${porcentaje}%`;

      tiempoActual.textContent =
        formatearTiempo(audio.currentTime);

      barra.setAttribute(
        "aria-valuenow",
        Math.round(porcentaje)
      );
    }

    function moverAudio(evento) {
      if (!audio.duration) {
        return;
      }

      const medidas = barra.getBoundingClientRect();

      const posicion = Math.min(
        Math.max(evento.clientX - medidas.left, 0),
        medidas.width
      );

      audio.currentTime =
        (posicion / medidas.width) * audio.duration;
    }

    /* ---------- EVENTOS ---------- */

    audio.addEventListener("loadedmetadata", () => {
      actualizarDuracion();
      actualizarProgreso();
    });

    audio.addEventListener("durationchange", actualizarDuracion);

    audio.addEventListener("timeupdate", actualizarProgreso);

    audio.addEventListener("play", () => {
      reproductor.classList.add("visible");
      reproductor.classList.add("reproduciendo");
    });

    audio.addEventListener("pause", () => {
      reproductor.classList.remove("reproduciendo");

      if (audio.currentTime > 0) {
        reproductor.classList.add("visible");
      }
    });

    audio.addEventListener("ended", () => {
      reproductor.classList.remove("reproduciendo");
      audio.currentTime = 0;
      actualizarProgreso();
    });

    barra.addEventListener("click", moverAudio);

    barra.addEventListener("keydown", evento => {
      if (!audio.duration) {
        return;
      }

      if (evento.key === "ArrowRight") {
        evento.preventDefault();

        audio.currentTime = Math.min(
          audio.currentTime + 5,
          audio.duration
        );
      }

      if (evento.key === "ArrowLeft") {
        evento.preventDefault();

        audio.currentTime = Math.max(
          audio.currentTime - 5,
          0
        );
      }
    });

    actualizarDuracion();
    actualizarProgreso();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarReproductorAura
    );
  } else {
    iniciarReproductorAura();
  }
})();
