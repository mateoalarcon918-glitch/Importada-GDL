# IMPORTADA GDL

Sitio estático adaptable para Tienda de Ropa Importada GDL. Se construye con HTML, CSS y JavaScript sin dependencias ni proceso de compilación.

## Ejecutar localmente

Abre `index.html` en un navegador. Para probarlo con un servidor local, desde esta carpeta ejecuta:

```powershell
python -m http.server 8000
```

Visita `http://localhost:8000`. También puedes publicar los archivos en cualquier hosting estático.

## Personalización

- **Productos, categorías, precios e imágenes:** edita el arreglo `products` en `script.js`. Sustituye cada producto de demostración y su imagen, texto alternativo, categoría y precio por información confirmada. Para mostrar una categoría distinta, actualiza también los botones `data-filter` en `index.html`.
- **WhatsApp:** asigna a `WHATSAPP_NUMBER` en `script.js` el número confirmado, con código de país y solo dígitos (por ejemplo, `5213312345678`). Mientras esté vacío, los botones muestran un mensaje claro y no abren un destino ficticio.
- **Ubicación:** reemplaza la dirección visible y la búsqueda de Google Maps en `index.html` cuando el propietario confirme la ubicación exacta. El enlace actual busca el nombre y la dirección de referencia, no indica coordenadas ni un número de local.
- **Fotografías:** las imágenes del sitio son fotografías editoriales de demostración servidas desde Unsplash; no representan el inventario real. Reemplaza sus direcciones en `index.html` y `script.js` por imágenes propias u otras autorizadas.
- **Metadatos:** ajusta el título, la descripción SEO y Open Graph dentro de `<head>` en `index.html` cuando se definan datos oficiales.

El catálogo de ejemplo muestra explícitamente que nombres, imágenes y precios son demostrativos. No se publican horarios, redes sociales ni teléfono porque todavía no han sido proporcionados.

## Publicación

Publica `index.html`, `styles.css`, `script.js` y `favicon.svg` en la raíz del hosting estático. No requiere servidor de aplicaciones. Las tipografías y fotografías actuales necesitan conexión a internet; pueden sustituirse por recursos locales si se desea autoservicio completo.
