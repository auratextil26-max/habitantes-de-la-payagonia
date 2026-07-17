/* =====================================================
   AURA TEXTIL — CIERRE COLECCIÓN PATAGONIA SALVAJE
===================================================== */

(() => {
  const especies = {
    "carpintero-negro": {
      frase:
        "La fuerza de los bosques australes convertida en diseño."
    },

    "puma": {
      frase:
        "El espíritu del gran felino de la Patagonia hecho arte textil."
    },

    "flamenco": {
      frase:
        "La elegancia y el color de los humedales australes convertidos en diseño."
    },

    "condor": {
      frase:
        "Inspirado en la majestuosidad del vuelo más imponente de los Andes."
    },

    "guanaco": {
      frase:
        "La libertad de la estepa patagónica plasmada en una colección única."
    },

    "martin-pescador": {
      frase:
        "La belleza de los ríos patagónicos llevada a una prenda exclusiva."
    }
  };

  function detectarEspecie() {
    const ruta = window.location.pathname.toLowerCase();

    return Object.keys(especies).find(especie =>
      ruta.includes(especie)
    );
  }

  function agregarEstilos() {
    if (document.getElementById("estilos-coleccion-aura")) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-coleccion-aura";

    estilos.textContent = `
      .coleccion-aura {
        position: relative;
        z-index: 10;

        width: min(1040px, calc(100% - 32px));
        margin: 50px auto 70px;
        padding: 72px 36px 58px;

        overflow: hidden;
        text-align: center;

        background:
          linear-gradient(
            145deg,
            rgba(7, 18, 12, 0.97),
            rgba(15, 35, 23, 0.94)
          );

        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 30px;

        box-shadow:
          0 30px 80px rgba(0, 0, 0, 0.38),
          inset 0 1px 0 rgba(255, 255, 255, 0.08);

        opacity: 0;
        transform: translateY(42px);

        transition:
          opacity 0.9s ease,
          transform 0.9s ease;
      }

      .coleccion-aura.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .coleccion-aura::before {
        content: "";
        position: absolute;

        width: 500px;
        height: 500px;

        top: -260px;
        left: 50%;

        transform: translateX(-50%);

        background:
          radial-gradient(
            circle,
            var(--color-especie, rgba(200, 225, 130, 0.35)),
            transparent 68%
          );

        opacity: 0.34;
        pointer-events: none;
      }

      .coleccion-aura::after {
        content: "";
        position: absolute;
        inset: 0;

        background:
          repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.014) 0,
            rgba(255, 255, 255, 0.014) 1px,
            transparent 1px,
            transparent 5px
          );

        opacity: 0.32;
        pointer-events: none;
      }

      .coleccion-montanas {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;

        width: 100%;
        height: 190px;

        opacity: 0.1;
        pointer-events: none;
      }

      .coleccion-montanas svg {
        width: 100%;
        height: 100%;
      }

      .coleccion-montanas path {
        fill: none;
        stroke: rgba(255, 255, 255, 0.8);
        stroke-width: 2;
      }

      .coleccion-contenido {
        position: relative;
        z-index: 2;

        max-width: 760px;
        margin: 0 auto;
      }

      .coleccion-logo {
        display: block;

        width: 105px;
        max-height: 85px;

        margin: 0 auto 22px;

        object-fit: contain;

        filter:
          drop-shadow(
            0 10px 24px rgba(0, 0, 0, 0.35)
          );
      }

      .coleccion-etiqueta {
        margin-bottom: 13px;

        color: var(--color-especie, #d7e78a);

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: 10px;
        font-weight: 800;

        letter-spacing: 2.6px;
        line-height: 1.5;

        text-transform: uppercase;
      }

      .coleccion-titulo {
        margin: 0;

        color: #ffffff;

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size: clamp(42px, 7vw, 78px);
        font-weight: 500;

        letter-spacing: 1px;
        line-height: 0.98;
      }

      .coleccion-lema {
        margin: 18px 0 22px;

        color: rgba(255, 255, 255, 0.88);

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size: clamp(17px, 2.5vw, 22px);
        font-style: italic;
        line-height: 1.5;
      }

      .coleccion-descripcion {
        max-width: 660px;
        margin: 0 auto;

        color: rgba(255, 255, 255, 0.7);

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: 15px;
        line-height: 1.8;
      }

      .coleccion-frase {
        position: relative;

        max-width: 620px;
        margin: 31px auto 32px;
        padding: 22px 26px;

        color: rgba(255, 255, 255, 0.94);
        background: rgba(255, 255, 255, 0.055);

        border:
          1px solid rgba(255, 255, 255, 0.12);

        border-radius: 18px;

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size: clamp(18px, 3vw, 25px);
        line-height: 1.45;
      }

      .coleccion-frase::before {
        content: "“";

        position: absolute;
        top: -17px;
        left: 18px;

        color: var(--color-especie, #d7e78a);

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size: 62px;
        line-height: 1;

        opacity: 0.42;
      }

      .coleccion-boton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 11px;

        min-height: 52px;
        padding: 0 25px;

        color: #0c160f;
        background: var(--color-especie, #d7e78a);

        border:
          1px solid rgba(255, 255, 255, 0.22);

        border-radius: 999px;

        box-shadow:
          0 14px 32px rgba(0, 0, 0, 0.28),
          0 0 28px
            color-mix(
              in srgb,
              var(--color-especie, #d7e78a) 24%,
              transparent
            );

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: 11px;
        font-weight: 900;

        letter-spacing: 1.25px;
        text-decoration: none;
        text-transform: uppercase;

        transition:
          transform 0.25s ease,
          box-shadow 0.25s ease,
          filter 0.25s ease;
      }

      .coleccion-boton:hover {
        transform: translateY(-3px);

        filter: brightness(1.08);

        box-shadow:
          0 19px 40px rgba(0, 0, 0, 0.34),
          0 0 36px
            color-mix(
              in srgb,
              var(--color-especie, #d7e78a) 35%,
              transparent
            );
      }

      .coleccion-boton:active {
        transform: translateY(0);
      }

      .coleccion-instagram {
        width: 18px;
        height: 18px;
        flex: 0 0 auto;
      }

      .coleccion-usuario {
        margin-top: 17px;

        color: rgba(255, 255, 255, 0.58);

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: 12px;
        font-weight: 700;

        letter-spacing: 1px;
      }

      @media (max-width: 700px) {
        .coleccion-aura {
          margin-top: 36px;
          margin-bottom: 45px;

          padding:
            54px
            21px
            43px;

          border-radius: 24px;
        }

        .coleccion-logo {
          width: 88px;
          margin-bottom: 19px;
        }

        .coleccion-etiqueta {
          font-size: 9px;
          letter-spacing: 1.8px;
        }

        .coleccion-descripcion {
          font-size: 14px;
          line-height: 1.72;
        }

        .coleccion-frase {
          padding: 20px 18px;
          margin-top: 27px;
          margin-bottom: 28px;
        }

        .coleccion-boton {
          width: 100%;
          padding: 0 17px;
          font-size: 10px;
        }

        .coleccion-montanas {
          height: 130px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .coleccion-aura,
        .coleccion-boton {
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(estilos);
  }

  function crearColeccion() {
    const especieActual = detectarEspecie();

    if (
      !especieActual ||
      document.querySelector(".coleccion-aura")
    ) {
      return;
    }

    const mapa = document.querySelector(".mapa-patagonia");

    if (!mapa) {
      return;
    }

    agregarEstilos();

    const datos = especies[especieActual];

    const seccion = document.createElement("section");

    seccion.className = "coleccion-aura";

    seccion.innerHTML = `
      <div class="coleccion-montanas" aria-hidden="true">
        <svg
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0 225
              L125 145
              L210 192
              L340 72
              L430 160
              L520 110
              L600 180
              L705 56
              L810 167
              L900 102
              L1020 180
              L1120 124
              L1200 204
            "
          />

          <path
            d="
              M0 238
              L180 190
              L305 222
              L455 145
              L580 212
              L750 154
              L910 219
              L1070 170
              L1200 225
            "
          />
        </svg>
      </div>

      <div class="coleccion-contenido">

        <img
          class="coleccion-logo"
          src="../logo.png"
          alt="Logo de Aura Textil"
        >

        <div class="coleccion-etiqueta">
          Descubre la primera colección de Aura Textil
        </div>

        <h2 class="coleccion-titulo">
          Patagonia Salvaje
        </h2>

        <p class="coleccion-lema">
          Donde la Patagonia se convierte en arte.
        </p>

        <p class="coleccion-descripcion">
          Cada diseño de <strong>Patagonia Salvaje</strong>
          nace de una fotografía propia capturada en la
          Patagonia chilena y es transformado en una prenda
          exclusiva. Una colección inspirada en la fauna
          austral, creada para quienes llevan la naturaleza
          consigo.
        </p>

        <div class="coleccion-frase">
          ${datos.frase}
        </div>

        <a
          class="coleccion-boton"
          href="https://www.instagram.com/_auratextil/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            class="coleccion-instagram"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />

            <circle
              cx="12"
              cy="12"
              r="4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />

            <circle
              cx="17.5"
              cy="6.5"
              r="1.2"
              fill="currentColor"
            />
          </svg>

          <span class="coleccion-boton-texto">
            Ver colección en Instagram
          </span>
        </a>

        <div class="coleccion-usuario">
          @_auratextil
        </div>

      </div>
    `;

    mapa.insertAdjacentElement("afterend", seccion);

    const boton =
      seccion.querySelector(".coleccion-boton");

    const textoBoton =
      seccion.querySelector(".coleccion-boton-texto");

    boton.addEventListener("click", () => {
      textoBoton.textContent = "Abriendo colección…";
    });

    const observador = new IntersectionObserver(
      entradas => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            seccion.classList.add("visible");
            observador.disconnect();
          }
        });
      },
      {
        threshold: 0.16
      }
    );

    observador.observe(seccion);
  }

  function esperarMapa() {
    if (document.querySelector(".mapa-patagonia")) {
      crearColeccion();
      return;
    }

    const observadorPagina = new MutationObserver(() => {
      if (document.querySelector(".mapa-patagonia")) {
        observadorPagina.disconnect();
        crearColeccion();
      }
    });

    observadorPagina.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      esperarMapa
    );
  } else {
    esperarMapa();
  }
})();
