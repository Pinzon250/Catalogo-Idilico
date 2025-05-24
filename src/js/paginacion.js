document.addEventListener("DOMContentLoaded", () => {
  const productos = document.querySelectorAll(".producto");
  const itemsPorPagina = 12;

  // ✅ Obtener página desde URL, con fallback a 1
  const params = new URLSearchParams(window.location.search);
  let paginaActual = parseInt(params.get("pagina")) || 1;

  const totalPaginas = Math.ceil(productos.length / itemsPorPagina);

  function mostrarPagina(pagina) {
    productos.forEach((producto, index) => {
      const inicio = (pagina - 1) * itemsPorPagina;
      const fin = inicio + itemsPorPagina;
      producto.style.display = index >= inicio && index < fin ? "" : "none";
    });
    document.getElementById("page-info").textContent =
      `Página ${pagina} de ${totalPaginas}`;
  }

  document.getElementById("prev-page").addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      // Cambiar URL (opcional)
      window.history.pushState({}, "", `?pagina=${paginaActual}`);
      mostrarPagina(paginaActual);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      window.history.pushState({}, "", `?pagina=${paginaActual}`);
      mostrarPagina(paginaActual);
    }
  });

  // Mostrar página inicial
  mostrarPagina(paginaActual);
});
