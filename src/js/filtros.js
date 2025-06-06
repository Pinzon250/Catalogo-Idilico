document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const searchInput = document.querySelector("input[type='text']");
  const productos = document.querySelectorAll(".producto");

  function filtrarProductos() {
    const categorias = getCheckedValues("categoria");
    const colores = getCheckedValues("color");
    const tamaños = getCheckedValues("tamaño");
    const secciones = getCheckedValues("seccion"); // 💡 Nuevo: secciones
    const terminoBusqueda = searchInput.value.toLowerCase();

    productos.forEach(producto => {
      const nombre = producto.dataset.nombre?.toLowerCase() || "";
      const categoria = producto.dataset.categoria || "";
      const color = producto.dataset.color || "";
      const tamaño = producto.dataset.tamaño || "";
      const seccion = producto.dataset.seccion || ""; // 💡 Nuevo: seccion

      const coincideBusqueda = nombre.includes(terminoBusqueda);
      const coincideCategoria = categorias.length === 0 || categorias.some(cat => categoria.includes(cat));
      const coincideColor = colores.length === 0 || colores.some(col => color.includes(col));
      const coincideTamaño = tamaños.length === 0 || tamaños.some(tam => tamaño.includes(tam));
      const coincideSeccion = secciones.length === 0 || secciones.some(sec => seccion.includes(sec));

      if (coincideBusqueda && coincideCategoria && coincideColor && coincideTamaño && coincideSeccion) {
        producto.style.display = "block";
      } else {
        producto.style.display = "none";
      }
    });
  }

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name='${name}']:checked`)).map(input => input.value);
  }

  checkboxes.forEach(cb => cb.addEventListener("change", filtrarProductos));
  searchInput.addEventListener("input", filtrarProductos);

  filtrarProductos(); // Filtro inicial
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-filtros");
  const sidebar = document.getElementById("filtros-sidebar");

  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header-navbar");
  const sidebar = document.getElementById("filtros-sidebar");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        // Si el navbar ya no es visible, ocultar sidebar en móviles
        if (window.innerWidth < 768) {
          sidebar.classList.add("hidden");
        }
      } else {
        // Si el navbar es visible, mostrar sidebar
        if (window.innerWidth < 768) {
          sidebar.classList.remove("hidden");
        }
      }
    },
    { threshold: 0 }
  );

  observer.observe(header);
});