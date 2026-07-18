document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("loaderMostrado")) {
    return;
  }

  sessionStorage.setItem("loaderMostrado", "si");

  const loader = document.createElement("div");
  loader.className = "page-loader";

  loader.innerHTML = `
    <div class="loader-content">
      <img src="logo.png" class="loader-logo" alt="Aura Textil">
      <h1>Habitantes de la Patagonia</h1>
      <p>Una experiencia fotográfica y sonora</p>
    </div>
  `;

  document.body.appendChild(loader);

  setTimeout(() => {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 900);
  }, 1800);
});
