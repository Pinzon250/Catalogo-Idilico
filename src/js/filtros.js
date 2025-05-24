document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const searchInput = document.querySelector("input[type='text']");
  const productos = document.querySelectorAll(".producto");

  function filtrarProductos() {
    const categorias = getCheckedValues("categoria");
    const colores = getCheckedValues("color");
    const tamaños = getCheckedValues("tamaño");
    const terminoBusqueda = searchInput.value.toLowerCase();

    productos.forEach(producto => {
      const nombre = producto.dataset.nombre.toLowerCase();
      const categoria = producto.dataset.categoria;
      const color = producto.dataset.color;
      const tamaño = producto.dataset.tamaño;

      const coincideBusqueda = nombre.includes(terminoBusqueda);
      const coincideCategoria = categorias.length === 0 || categorias.some(cat => categoria.includes(cat));
      const coincideColor = colores.length === 0 || colores.some(col => color.includes(col));
      const coincideTamaño = tamaños.length === 0 || tamaños.some(tam => tamaño.includes(tam));


      if (coincideBusqueda && coincideCategoria && coincideColor && coincideTamaño) {
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
