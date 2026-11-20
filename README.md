# Cuaderno ICON · Marca personal y redes (20 nov 2026)

Recurso interactivo posterior al evento. Página estática: HTML, CSS y JavaScript (módulos ES), sin dependencias ni build.

## Probar en local

```bash
npm run dev        # http://localhost:5173
```

Contraseña actual: `ICONREDES` (no distingue mayúsculas).

Para verlo sin servidor: `npm run bundle` genera `dist/cuaderno.html`, un único archivo que se abre con doble clic.

## Estructura

```
index.html          Puerta de acceso + contenedor del cuaderno
src/content.js      TODO lo editable: evento, contraseña, reto, UTM, mitos, casos, charlas, recursos
src/app.js          Lógica y pantallas (8 pasos)
src/gate.js         Comprobación de contraseña; carga app.js solo al entrar
src/styles.css      Estilos. Colores de marca en :root
assets/             Logos
scripts/hash.mjs    Genera el hash de una contraseña nueva
scripts/xlsx/       Script que genera las dos hojas de cálculo descargables (python3, openpyxl)
assets/descargas/   Descargables: informe de audiencia y plan de lanzamiento (XLSX), dosier (PDF)
```

## Publicarlo en iconmbs.com

Sube la carpeta tal cual a una ruta propia, por ejemplo `/eventos/redes-y-marca-personal-20-nov-2026/recursos/`. Todas las rutas son relativas, así que funciona en cualquier subcarpeta. Necesita **https** (la contraseña usa `crypto.subtle`).

No conviene incrustarlo dentro de una plantilla existente: los estilos son globales (`body`, `h1`, `button`…). Si tiene que ir dentro de otra página, usa un `<iframe>`.

La página lleva `noindex,nofollow`.

## Cambiar la contraseña

```bash
npm run hash -- "NuevaClave"
```

Pega el resultado en `CONFIG.passwordHash` (`src/content.js`).

La comprobación es en el navegador: sirve para dar exclusividad, no para proteger información sensible (quien conozca la URL de `src/content.js` puede leerlo). Si hiciera falta protección real, añade autenticación en el servidor para esta ruta.

## Pendiente tras el evento (`src/content.js`)

- `MITOS[].items[].dijeron`: qué dijo cada ponente sobre cada frase.
- `CASOS.*.propuestas`: propuestas de la mesa redonda para Lucía, Dani y Marta.
- `CHARLAS`: ponente, título e `ideas` de cada charla.
- `LECTURAS_ICON`: contenido propio de ICON (opcional).

Con `CONFIG.draft: true` los huecos vacíos se ven en amarillo; con `false` se ocultan.

## Reto

`CONFIG.reto` define la cuenta a etiquetar y la fecha de cierre (`fin`, `finTexto`). El contador de la cabecera y los textos salen de ahí.

## Medición

Todos los enlaces a iconmbs.com llevan los UTM de `CONFIG.utm` y `utm_content` con el paso desde el que se hizo clic (`diagnostico-datos`, `charlas`, `hoja`, `final`…).

## Datos del usuario

Las respuestas se guardan solo en `localStorage` del navegador (`icon-cuaderno-v2`). No se envía nada a ningún servidor.
