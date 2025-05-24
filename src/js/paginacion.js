document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-productos');
  const paginacion = document.getElementById('contenedor-paginacion');
  const datosProductos = JSON.parse(document.getElementById('datos-productos').textContent);
  const itemsPorPagina = 12;
  let paginaActual = 1;

  function renderPagina(pagina) {
    contenedor.innerHTML = '';
    const inicio = (pagina - 1) * itemsPorPagina;
    const productosPagina = datosProductos.slice(inicio, inicio + itemsPorPagina);

    productosPagina.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'border p-2';
      card.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full">
      `;
      contenedor.appendChild(card);
    });

    renderPaginacion();
  }

  function renderPaginacion() {
    paginacion.innerHTML = '';
    const totalPaginas = Math.ceil(datosProductos.length / itemsPorPagina);
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement('button');
      btn.className = `px-3 py-1 border rounded ${i === paginaActual ? 'bg-blue-500 text-white' : ''}`;
      btn.innerText = i;
      btn.addEventListener('click', () => {
        paginaActual = i;
        renderPagina(paginaActual);
      });
      paginacion.appendChild(btn);
    }
  }

  renderPagina(paginaActual);
});
