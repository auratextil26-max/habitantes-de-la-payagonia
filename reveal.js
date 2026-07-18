document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(
    ".species-header, .species-card, .intro-section, .closing-section, footer"
  );

  elementos.forEach((elemento) => {
    elemento.classList.add("reveal");
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  elementos.forEach((elemento) => {
    observador.observe(elemento);
  });
});
