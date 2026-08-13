# Taller SoldaPro

Sitio estático para un taller de soldadura en Ferreñafe, Lambayeque.

## Desarrollo local

No requiere dependencias. Desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Estructura

- `index.html`: página principal, servicios, galería, contacto y ubicación.
- `servicios.html`, `beneficios.html`: páginas de información.
- `galeria-*.html`: galerías por tipo de trabajo.
- `css/styles.css`: estilos responsivos y accesibles.
- `js/script.js`: navegación móvil, CTAs, formulario a WhatsApp y animaciones.

Las imágenes actuales son ilustraciones SVG de reemplazo. Sustitúyelas por fotografías optimizadas conservando los nombres de archivo o actualizando sus referencias.

## Publicación

El proyecto puede publicarse en cualquier hosting de archivos estáticos. Configura el dominio final antes de añadir una URL absoluta al canonical y al sitemap.
