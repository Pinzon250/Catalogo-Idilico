
const coloresCSS = {
  "Amarillo": "#FFD700",
  "Azul": "#0000FF",
  "Blanco": "#FFFFFF",
  "Cafe": "#8B4513",
  "Morado": "#800080",
  "Negro": "#000000",
  "Rojo": "#FF0000",
  "Verde": "#008000"
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-modal");
  const closeModal = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalImage = document.getElementById("modal-image");
  const modalColors = document.getElementById("modal-colors");
  const modalSizes = document.getElementById("modal-sizes");
  const whatsappLink = document.getElementById("whatsapp-link");

  // Manejar clic en cada producto
  document.querySelectorAll(".producto").forEach((producto) => {
    producto.addEventListener("click", () => {
      const nombre = producto.dataset.nombre;
      const precio = producto.dataset.precio;
      const colores = producto.dataset.color.split(",").map((c) => c.trim());
      const tamaños = producto.dataset.tamaño.split(",").map((t) => t.trim());
      const imagenes = JSON.parse(producto.dataset.imagenes);

      // Mostrar datos
      modalTitle.textContent = nombre;
      modalPrice.textContent = precio;
      modalImage.src = imagenes[colores[0]] || "/placeholder.png";

      // Generar colores
      const modalColors = document.getElementById("modal-colors");
    modalColors.innerHTML = "";
    colores.forEach((color) => {
      const colorLabel = document.createElement("label");
      const colorCSS = coloresCSS[color] || "transparent"; // Si no está, color transparente
      colorLabel.className = "relative flex cursor-pointer items-center justify-center rounded-full p-0.5";
      colorLabel.innerHTML = `
        <input type="radio" name="color-choice" value="${color}" class="sr-only">
        <span class="w-8 h-8 rounded-full border border-primario hover:scale-110 transition" style="background-color: ${colorCSS};"></span>
      `;
      colorLabel.addEventListener("click", () => {
        modalImage.src = imagenes[color] || "/placeholder.png";
      });
      modalColors.appendChild(colorLabel);
    });

      // Generar tamaños
      modalSizes.innerHTML = "";
      tamaños.forEach((tamaño) => {
        const sizeBtn = document.createElement("label");
        sizeBtn.className = "group relative flex items-center justify-center border-secundario rounded-md border bg-terciario px-4 py-3 text-sm font-medium text-primario uppercase shadow-xs";
        sizeBtn.innerHTML = `
          <input type="radio" name="size-choice" value="${tamaño}" class="sr-only">
          <span>${tamaño}</span>
          <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
        `;
        modalSizes.appendChild(sizeBtn);
      });

      // Enlace de WhatsApp
      whatsappLink.href = `https://wa.me/573105756537?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(nombre)}`;

      // Mostrar modal
      modal.classList.remove("hidden");
    });
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Cerrar haciendo clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
