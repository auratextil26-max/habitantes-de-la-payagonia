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
/* =====================================================
   NAVEGACIÓN ENTRE ESPECIES
===================================================== */

(() => {
  function crearNavegacionEspecies() {
    const especies = [
      {
        carpeta: "carpintero-negro",
        nombre: "Carpintero Negro",
        enlace: "../carpintero-negro/"
      },
      {
        carpeta: "puma",
        nombre: "Puma",
        enlace: "../puma/"
      },
      {
        carpeta: "flamenco",
        nombre: "Flamenco Chileno",
        enlace: "../Flamenco/"
      },
      {
        carpeta: "condor",
        nombre: "Cóndor Andino",
        enlace: "../condor/"
      },
      {
        carpeta: "guanaco",
        nombre: "Guanaco",
        enlace: "../guanaco/"
      },
      {
        carpeta: "martin-pescador",
        nombre: "Martín Pescador",
        enlace: "../martin-pescador/"
      }
    ];

    const partesRuta = window.location.pathname
      .split("/")
      .filter(Boolean);

    let carpetaActual =
      partesRuta[partesRuta.length - 1]?.toLowerCase() || "";

    if (carpetaActual === "index.html") {
      carpetaActual =
        partesRuta[partesRuta.length - 2]?.toLowerCase() || "";
    }

    const posicionActual = especies.findIndex(
      especie => especie.carpeta === carpetaActual
    );

    if (
      posicionActual === -1 ||
      document.querySelector(".navegacion-especies")
    ) {
      return;
    }

    const posicionAnterior =
      (posicionActual - 1 + especies.length) % especies.length;

    const posicionSiguiente =
      (posicionActual + 1) % especies.length;

    const especieAnterior = especies[posicionAnterior];
    const especieSiguiente = especies[posicionSiguiente];

    const estilos = document.createElement("style");

    estilos.id = "estilos-navegacion-especies";

    estilos.textContent = `
      .navegacion-especies {
        position: fixed;
        left: 50%;
        bottom: max(18px, env(safe-area-inset-bottom));
        z-index: 9999;
        width: min(920px, calc(100% - 34px));
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: rgba(7, 13, 9, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 999px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        transform: translateX(-50%);
      }

      .navegacion-especies a {
        min-height: 48px;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 18px;
        color: #ffffff;
        border-radius: 999px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-decoration: none;
        transition:
          background 0.25s ease,
          color 0.25s ease,
          transform 0.25s ease;
      }

      .navegacion-especies a:hover {
        background: rgba(255, 255, 255, 0.12);
      }

      .navegacion-anterior {
        justify-content: flex-start;
      }

      .navegacion-siguiente {
        justify-content: flex-end;
        text-align: right;
      }

      .volver-coleccion {
        justify-content: center;
        background: #f6f5ef;
        color: #071009 !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
        text-transform: uppercase;
        letter-spacing: 1.2px !important;
      }

      .volver-coleccion:hover {
        background: #c7e65b !important;
        transform: translateY(-2px);
      }

      .flecha-navegacion {
        color: #c7e65b;
        font-size: 20px;
        line-height: 1;
      }

      .volver-coleccion .flecha-navegacion {
        color: #071009;
        font-size: 15px;
      }

      @media (max-width: 700px) {
        .navegacion-especies {
          width: calc(100% - 22px);
          bottom: max(11px, env(safe-area-inset-bottom));
          grid-template-columns: 48px minmax(0, 1fr) 48px;
          padding: 6px;
        }

        .navegacion-especies a {
          min-height: 44px;
          padding: 8px;
        }

        .texto-especie {
          display: none;
        }

        .navegacion-anterior,
        .navegacion-siguiente {
          justify-content: center;
        }

        .volver-coleccion {
          padding-left: 12px !important;
          padding-right: 12px !important;
          font-size: 10px !important;
        }
      }
    `;

    document.head.appendChild(estilos);

    const navegacion = document.createElement("nav");

    navegacion.className = "navegacion-especies";
    navegacion.setAttribute(
      "aria-label",
      "Navegación entre especies"
    );

    navegacion.innerHTML = `
      <a
        href="${especieAnterior.enlace}"
        class="navegacion-anterior"
        aria-label="Ver ${especieAnterior.nombre}"
      >
        <span class="flecha-navegacion">←</span>

        <span class="texto-especie">
          ${especieAnterior.nombre}
        </span>
      </a>

      <a
        href="../"
        class="volver-coleccion"
        aria-label="Volver a la colección"
      >
        <span class="flecha-navegacion">⌂</span>
        Colección
      </a>

      <a
        href="${especieSiguiente.enlace}"
        class="navegacion-siguiente"
        aria-label="Ver ${especieSiguiente.nombre}"
      >
        <span class="texto-especie">
          ${especieSiguiente.nombre}
        </span>

        <span class="flecha-navegacion">→</span>
      </a>
    `;

    document.body.appendChild(navegacion);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      crearNavegacionEspecies
    );
  } else {
    crearNavegacionEspecies();
  }
})();
