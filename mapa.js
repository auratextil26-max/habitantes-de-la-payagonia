/* =====================================================
   AURA TEXTIL — MAPA DE HÁBITAT PATAGÓNICO
===================================================== */

(() => {
  const especies = {
    "carpintero-negro": {
      nombre: "Carpintero Negro",
      habitat: "Bosques templados y bosques de lenga de la Patagonia chilena.",
      zona: "Bosques australes",
      posicionX: 47,
      posicionY: 72
    },

    "puma": {
      nombre: "Puma",
      habitat: "Cordillera, estepa y zonas montañosas de la Patagonia.",
      zona: "Cordillera y estepa",
      posicionX: 55,
      posicionY: 63
    },

    "flamenco": {
      nombre: "Flamenco Chileno",
      habitat: "Lagunas, salares y humedales de la Patagonia austral.",
      zona: "Humedales australes",
      posicionX: 43,
      posicionY: 57
    },

    "condor": {
      nombre: "Cóndor Andino",
      habitat: "Cordillera de los Andes, riscos y zonas montañosas.",
      zona: "Cordillera patagónica",
      posicionX: 62,
      posicionY: 48
    },

    "guanaco": {
      nombre: "Guanaco",
      habitat: "Estepas abiertas, pampas y zonas semiáridas de la Patagonia.",
      zona: "Estepa patagónica",
      posicionX: 52,
      posicionY: 54
    },

    "martin-pescador": {
      nombre: "Martín Pescador Grande",
      habitat: "Ríos, lagos, lagunas y cursos de agua rodeados de bosque.",
      zona: "Ríos y lagos australes",
      posicionX: 44,
      posicionY: 68
    }
  };

  function detectarEspecie() {
    const ruta = window.location.pathname.toLowerCase();

    return Object.keys(especies).find(especie =>
      ruta.includes(especie)
    );
  }

  function iniciarMapaPatagonia() {
    const especieActual = detectarEspecie();

    if (
      !especieActual ||
      document.querySelector(".mapa-patagonia")
    ) {
      return;
    }

    const datos = especies[especieActual];

    const seccionReferencia =
      document.querySelector(".info-panel") ||
      document.querySelector(".species-info") ||
      document.querySelector("main") ||
      document.querySelector(".hero-content");

    if (!seccionReferencia) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-mapa-patagonia";

    estilos.textContent = `
      .mapa-patagonia {
        position: relative;
        z-index: 10;
        width: min(920px, calc(100% - 32px));
        margin: 70px auto 40px;
        padding: 34px;

        display: grid;
        grid-template-columns: minmax(260px, 0.9fr) minmax(280px, 1.1fr);
        gap: 38px;
        align-items: center;

        background:
          linear-gradient(
            145deg,
            rgba(9, 21, 14, 0.96),
            rgba(14, 32, 21, 0.9)
          );

        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 28px;

        box-shadow:
          0 25px 65px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.08);

        overflow: hidden;

        opacity: 0;
        transform: translateY(35px);

        transition:
          opacity 0.8s ease,
          transform 0.8s ease;
      }

      .mapa-patagonia.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .mapa-patagonia::before {
        content: "";
        position: absolute;
        width: 260px;
        height: 260px;
        right: -100px;
        top: -100px;

        background:
          radial-gradient(
            circle,
            var(--color-especie, rgba(196, 221, 120, 0.24)),
            transparent 68%
          );

        opacity: 0.42;
        pointer-events: none;
      }

      .mapa-etiqueta {
        margin-bottom: 14px;

        color: var(--color-especie, #d7e78a);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2.4px;
        text-transform: uppercase;
      }

      .mapa-titulo {
        margin: 0 0 16px;

        color: #ffffff;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(30px, 4vw, 48px);
        font-weight: 500;
        line-height: 1.02;
      }

      .mapa-descripcion {
        margin: 0 0 24px;

        color: rgba(255, 255, 255, 0.74);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 15px;
        line-height: 1.7;
      }

      .mapa-zona {
        display: inline-flex;
        align-items: center;
        gap: 9px;

        padding: 10px 14px;

        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.07);

        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 999px;

        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.7px;
      }

      .mapa-zona::before {
        content: "";
        width: 8px;
        height: 8px;

        background: var(--color-especie, #d7e78a);
        border-radius: 50%;

        box-shadow:
          0 0 0 5px rgba(215, 231, 138, 0.1),
          0 0 18px var(--color-especie, #d7e78a);
      }

      .mapa-visual {
        position: relative;
        min-height: 440px;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .patagonia-silueta {
        position: relative;
        width: 235px;
        height: 410px;

        filter:
          drop-shadow(0 24px 28px rgba(0, 0, 0, 0.28));
      }

      .patagonia-silueta svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .patagonia-forma {
        fill: rgba(255, 255, 255, 0.08);
        stroke: rgba(255, 255, 255, 0.32);
        stroke-width: 2;
      }

      .patagonia-linea {
        fill: none;
        stroke: rgba(255, 255, 255, 0.1);
        stroke-width: 1;
        stroke-dasharray: 5 8;
      }

      .mapa-punto {
        position: absolute;
        left: var(--mapa-x);
        top: var(--mapa-y);

        width: 17px;
        height: 17px;

        background: #ffffff;
        border: 4px solid var(--color-especie, #d7e78a);
        border-radius: 50%;

        transform: translate(-50%, -50%);

        box-shadow:
          0 0 0 8px rgba(215, 231, 138, 0.12),
          0 0 28px var(--color-especie, #d7e78a);

        animation: pulsoMapa 2.2s ease-in-out infinite;
      }

      .mapa-punto::after {
        content: "";
        position: absolute;
        inset: -13px;

        border: 1px solid var(--color-especie, #d7e78a);
        border-radius: 50%;

        animation: ondaMapa 2.2s ease-out infinite;
      }

      .mapa-nombre-zona {
        position: absolute;
        left: calc(var(--mapa-x) + 23px);
        top: calc(var(--mapa-y) - 7px);

        max-width: 135px;

        color: rgba(255, 255, 255, 0.9);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1px;
        line-height: 1.4;
        text-transform: uppercase;
      }

      @keyframes pulsoMapa {
        0%,
        100% {
          transform: translate(-50%, -50%) scale(1);
        }

        50% {
          transform: translate(-50%, -50%) scale(1.16);
        }
      }

      @keyframes ondaMapa {
        0% {
          opacity: 0.75;
          transform: scale(0.7);
        }

        100% {
          opacity: 0;
          transform: scale(1.8);
        }
      }

      @media (max-width: 760px) {
        .mapa-patagonia {
          grid-template-columns: 1fr;
          gap: 20px;

          margin-top: 45px;
          padding: 26px 22px;
        }

        .mapa-visual {
          min-height: 390px;
        }

        .patagonia-silueta {
          width: 205px;
          height: 360px;
        }

        .mapa-nombre-zona {
          max-width: 105px;
          font-size: 9px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .mapa-patagonia,
        .mapa-punto,
        .mapa-punto::after {
          animation: none !important;
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(estilos);

    const mapa = document.createElement("section");

    mapa.className = "mapa-patagonia";

    mapa.innerHTML = `
      <div class="mapa-contenido">

        <div class="mapa-etiqueta">
          Distribución natural
        </div>

        <h2 class="mapa-titulo">
          Su hogar en la Patagonia
        </h2>

        <p class="mapa-descripcion">
          ${datos.habitat}
        </p>

        <div class="mapa-zona">
          ${datos.zona}
        </div>

      </div>

      <div
        class="mapa-visual"
        style="
          --mapa-x: ${datos.posicionX}%;
          --mapa-y: ${datos.posicionY}%;
        "
      >

        <div class="patagonia-silueta">
          <svg
            viewBox="0 0 220 430"
            role="img"
            aria-label="Mapa estilizado de la Patagonia"
          >
            <path
              class="patagonia-forma"
              d="
                M95 12
                C116 24 126 43 124 64
                C122 86 140 102 138 126
                C136 149 154 165 151 188
                C147 214 164 231 158 254
                C153 275 167 294 157 314
                C148 332 153 351 141 368
                C130 385 123 403 106 419
                C92 404 83 391 77 373
                C69 353 54 339 56 317
                C58 296 43 282 48 261
                C53 240 39 224 47 205
                C55 185 44 168 54 148
                C63 129 55 108 66 91
                C77 73 69 53 79 35
                C84 25 89 18 95 12
                Z
              "
            />

            <path
              class="patagonia-linea"
              d="M65 105 C90 116 118 115 139 104"
            />

            <path
              class="patagonia-linea"
              d="M51 197 C87 207 123 205 154 192"
            />

            <path
              class="patagonia-linea"
              d="M50 286 C85 298 125 296 160 282"
            />
          </svg>

          <div class="mapa-punto"></div>

          <div class="mapa-nombre-zona">
            ${datos.zona}
          </div>
        </div>

      </div>
    `;

    seccionReferencia.insertAdjacentElement(
      "afterend",
      mapa
    );

    requestAnimationFrame(() => {
      mapa.classList.add("visible");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarMapaPatagonia
    );
  } else {
    iniciarMapaPatagonia();
  }
})();
