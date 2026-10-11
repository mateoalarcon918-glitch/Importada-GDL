"use strict";

// Use the international digits only, for example 5213312345678. Leave empty until confirmed.
const WHATSAPP_NUMBER = "";

const products = [
  {
    id: "demo-playera",
    name: "Playera de demostración",
    category: "playeras",
    categoryLabel: "Playeras",
    price: "Precio por confirmar",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=850&q=80",
    alt: "Playera de color claro, imagen de demostración",
  },
  {
    id: "demo-sudadera",
    name: "Sudadera de demostración",
    category: "sudaderas",
    categoryLabel: "Sudaderas",
    price: "Precio por confirmar",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=850&q=80",
    alt: "Sudadera en tono neutro, imagen de demostración",
  },
  {
    id: "demo-pantalon",
    name: "Pantalón de demostración",
    category: "pantalones",
    categoryLabel: "Pantalones",
    price: "Precio por confirmar",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=850&q=80",
    alt: "Pantalón de mezclilla, imagen de demostración",
  },
  {
    id: "demo-chamarra",
    name: "Chamarra de demostración",
    category: "chamarras",
    categoryLabel: "Chamarras",
    price: "Precio por confirmar",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=850&q=80",
    alt: "Chamarra en tono oscuro, imagen de demostración",
  },
  {
    id: "demo-gorra",
    name: "Gorra de demostración",
    category: "gorras",
    categoryLabel: "Gorras",
    price: "Precio por confirmar",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=850&q=80",
    alt: "Gorra de estilo urbano, imagen de demostración",
  },
  {
    id: "demo-accesorio",
    name: "Accesorio de demostración",
    category: "accesorios",
    categoryLabel: "Accesorios",
    price: "Precio por confirmar",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=850&q=80",
    alt: "Accesorio en tonos neutros, imagen de demostración",
  },
];

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll("[data-filter]");
const feedback = document.querySelector("#contact-feedback");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

function renderProducts(category = "all") {
  if (!(productGrid instanceof HTMLElement)) {
    throw new Error("No se encontró el contenedor del catálogo.");
  }

  const visibleProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  productGrid.replaceChildren(
    ...visibleProducts.map((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      const imageWrap = document.createElement("div");
      imageWrap.className = "product-photo-wrap";

      const image = document.createElement("img");
      image.className = "product-photo";
      image.src = product.image;
      image.alt = product.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => {
        imageWrap.classList.add("image-unavailable");
        image.alt = `${product.alt}. La imagen no está disponible.`;
      });

      const demoTag = document.createElement("span");
      demoTag.className = "demo-tag";
      demoTag.textContent = "IMAGEN DE DEMOSTRACIÓN";

      imageWrap.append(image, demoTag);

      const info = document.createElement("div");
      info.className = "product-info";

      const titleGroup = document.createElement("div");
      const categoryLabel = document.createElement("p");
      categoryLabel.className = "product-category";
      categoryLabel.textContent = product.categoryLabel;

      const name = document.createElement("h3");
      name.className = "product-name";
      name.textContent = product.name;
      titleGroup.append(categoryLabel, name);

      const price = document.createElement("p");
      price.className = "product-price";
      price.textContent = product.price;
      info.append(titleGroup, price);

      const consult = document.createElement("button");
      consult.className = "product-consult";
      consult.type = "button";
      consult.dataset.whatsapp = "";
      consult.dataset.product = product.name;
      consult.innerHTML = 'Consultar disponibilidad <span aria-hidden="true">↗</span>';

      card.append(imageWrap, info, consult);
      return card;
    }),
  );
}

function normalizeWhatsAppNumber(number) {
  return number.replace(/\D/g, "");
}

function contactWhatsApp(productName) {
  const number = normalizeWhatsAppNumber(WHATSAPP_NUMBER);
  if (!number) {
    if (feedback instanceof HTMLElement) {
      feedback.textContent =
        "El contacto por WhatsApp aún no está configurado. Pronto podrás escribirnos por este medio.";
      feedback.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    return;
  }

  const message = productName
    ? `Hola, me interesa consultar la disponibilidad de: ${productName}.`
    : "Hola, me gustaría conocer más sobre la tienda y su colección.";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

renderProducts();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    if (!category) {
      throw new Error("El filtro de categoría no tiene un valor configurado.");
    }

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderProducts(category);
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const contactLink = target.closest("[data-whatsapp]");
  if (contactLink) {
    event.preventDefault();
    const productName = contactLink.getAttribute("data-product");
    contactWhatsApp(productName);
  }

  if (
    navigation instanceof HTMLElement &&
    menuToggle instanceof HTMLButtonElement &&
    navigation.classList.contains("is-open") &&
    target.closest("#site-navigation a")
  ) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});

if (menuToggle instanceof HTMLButtonElement && navigation instanceof HTMLElement) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navigation.classList.toggle("is-open", !isOpen);
  });
}

const year = document.querySelector("#current-year");
if (year instanceof HTMLElement) {
  year.textContent = String(new Date().getFullYear());
}
