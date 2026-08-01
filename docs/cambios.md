# Registro de cambios

Reorganización y saneamiento de Steps-Register. Agrupado por fase.

Fecha: 2026-07-31
Estado de partida: ver [auditoria.md](auditoria.md).

---

## 2. Estructura

Se pasó de tres carpetas en mayúsculas en la raíz a la jerarquía `assets/`.

| Antes | Después |
|---|---|
| `CSS/normalize.css` + `CSS/styles.css` + `CSS/fonts.css` | `assets/css/base.css`, `assets/css/layout.css`, `assets/css/components.css` |
| `JS/script.js` | `assets/js/main.js` |
| `IMG/` | `assets/img/` |
| `Steps-Register.png` (raíz) | `assets/img/favicon.png` + `assets/img/steps-register-preview.jpg` |

No se creó `assets/js/modules/` ni `assets/css/pages/`: el proyecto tiene una
página y unas 315 líneas de JavaScript, y la fase 2 permite adaptar la
jerarquía a proyectos más simples antes que dejar carpetas casi vacías.

Archivos nuevos: `404.html`, `robots.txt`, `sitemap.xml`, `.gitignore`,
`docs/auditoria.md`, `docs/cambios.md`.

## 3. Higiene

Eliminados:

| Archivo | Motivo |
|---|---|
| `CSS/styles.scss` | Fuente Sass del CSS antiguo. Mantenerla sería una trampa: el siguiente guardado de Prepros habría sobrescrito el CSS nuevo con el diseño viejo |
| `CSS/prepros.config` | 884 líneas de configuración de un compilador que ya no hace falta. El proyecto queda sin paso de compilación |
| `CSS/normalize.css` | Sustituido por el reset de `base.css`. Además traía `* { transition: .3s }` y una scrollbar de un color ajeno a la paleta |
| `IMG/background.png` (231 KB) | Reproducido como dos `radial-gradient` en CSS |
| `IMG/blur-radial.svg` | Era el halo con el que estaba construido el fondo. Ahora está en el CSS |
| `IMG/next.svg` | Su trazado se incrusta en línea en los botones "Continue" |
| `IMG/icon.png` (42 KB) | Huérfano: logotipo de marca WIB que ninguna página referenciaba |
| `Steps-Register.png` (159 KB) | Maestro del logotipo. El favicon y la imagen de compartir se derivan de él |

Todos estaban commiteados, así que siguen recuperables desde el historial.

Credenciales, tokens o API keys encontrados: **ninguno**.

Formato normalizado: indentación de 2 espacios, comillas dobles en HTML,
punto y coma en JS, salto de línea final en todos los archivos.

## 4. Imágenes

- `favicon.png` — 180 × 180, 16 KB, derivado del logotipo de 1024 × 1024.
  Antes el favicon era ese PNG de 1024 × 1024 y 159 KB, declarado además con
  el tipo equivocado (`image/x-icon`).
- `steps-register-preview.jpg` — 1200 × 630, 19 KB. Compuesto a partir de dos
  archivos que ya existían: el logotipo sobre el color de fondo del sitio con
  los halos de `blur-radial.svg`. Es la imagen de Open Graph, y 1200 × 630 es
  la proporción que esperan las plataformas al compartir.
- El fondo de 231 KB desapareció. Además de pesar, `background-size: cover`
  recortaba los halos justo en móvil, donde no se veía ninguno de los dos.
  Los gradientes CSS usan el color exacto muestreado del bitmap (base
  `#121826`, halo `#652CD1` al 32 %) y se adaptan a cualquier viewport.

No hay ningún `<img>` en el sitio, así que no aplican `width`/`height`,
`loading="lazy"` ni textos `alt`. Los dos SVG incrustados son decorativos y
van con `aria-hidden="true"`.

**Peso total de la primera carga: ~46 KB** (HTML + 3 CSS + 1 JS + favicon),
frente a los ~480 KB anteriores.

## 5. HTML, SEO y accesibilidad

- Los pasos ya no son `<main>`, `<section>` y `<footer>`. Ahora son cuatro
  `<section class="step">` dentro de un único `<main>`, cada una con su `<h2>`
  y su `aria-labelledby`. El resumen del registro había sido literalmente el
  `<footer>` de la página.
- Un solo `<h1>`, oculto visualmente para no alterar el diseño, que da nombre
  a la página. Jerarquía `h1 → h2 ×4`, sin saltos y sin `<h3>` usados como
  etiquetas de estado.
- El `<nav>` que envolvía el indicador de progreso desaparece: no era
  navegación. Ahora es una `<ol>` decorativa (`aria-hidden`) más una etiqueta
  de texto con `aria-live="polite"`, que es lo que se anuncia al cambiar de paso.
- Los tres checkboxes se agrupan con `role="group"` y `aria-labelledby`
  apuntando al encabezado del paso, en lugar de estar sueltos.
- Eliminados los dos `</button>` de cierre sobrantes que hacían el HTML inválido.
- `<head>` completo: título único de 54 caracteres, descripción de 154,
  Open Graph con imagen real, canonical y favicon existente.
- `robots.txt` y `sitemap.xml` nuevos.
- **Datos inventados eliminados**: `Emely Johnson`, `emely@emelyjohnsonth.com`
  y los dos temas preseleccionados estaban escritos a mano en el marcado del
  resumen. Ahora el resumen nace vacío y lo rellena el formulario.
- Eliminado el `<h3>Step of</h3>` de relleno que el CSS ocultaba.

### Contraste

Cinco valores no llegaban al mínimo de 4,5:1. Todos corregidos:

| Elemento | Antes | Después |
|---|---|---|
| Placeholder de los campos | `#4D5562` — 1,94:1 | `#8A92A6` — 4,70:1 |
| Etiqueta "Step n of 3" | `#394150` — 1,73:1 | `#8A92A6` — 5,69:1 |
| Mensajes de error | `#D31B1B` — 2,75:1 | `#F87171` — 5,29:1 |
| Etiqueta de tema sin marcar | `#A1A1A9` — 4,00:1 | `#C3C4CA` — 5,90:1 |
| Texto del botón principal | blanco sobre `#845EEE` — 4,36:1 | blanco sobre `#7A52E4` — 5,06:1 |

El degradado del botón se oscurece en `:hover` y `:active` en lugar de
aclararse, para que el contraste solo mejore al interactuar.

## 6. CSS

- Tres archivos con orden interno fijo: variables → reset → base → layout →
  componentes → utilidades → media queries.
- Paleta, espaciados, radios, tipografía y transiciones extraídos a variables
  en `:root`. La paleta se derivó de los colores que el sitio ya usaba, no se
  inventó ninguno.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48. Antes había valores como
  3,5 / 7,5 / 8,5 / 9,5 / 12,5 / 14,5 px.
- **Selectores por significado, no por posición.** La hoja anterior se apoyaba
  en `:nth-child` con cadenas de hasta 8 niveles: mover un `<div>` rompía el
  diseño. Ahora ningún selector pasa de 3 niveles.
- Eliminada la regla duplicada `main .internal-width > :nth-child(2)`.
- Eliminado `* { transition: .3s }`, que animaba todas las propiedades de
  todos los elementos.
- Eliminadas las 10 reglas `::selection { background: none }` que impedían ver
  el texto seleccionado.
- Añadido `@media (prefers-reduced-motion: reduce)`.
- Un solo `!important`, dentro de ese bloque de motion, donde es necesario.

## 7. Responsive

- **Corregido el fallo más grave.** La tarjeta tenía `flex-flow: column wrap`
  con `height: 55vh`: en viewport bajo el contenido saltaba a una segunda
  columna y el botón "Continue" acababa fuera del recuadro. Verificado antes
  a 740 × 360; ahora el layout aguanta y la página simplemente hace scroll.
- Eliminado `body { overflow: hidden }`, que recortaba el contenido en lugar
  de dejar desplazarlo.
- Eliminado todo el dimensionado en `vh`. El ancho de la tarjeta dependía de
  la **altura** de la ventana (`max-width: 73.5vh`); ahora es `max-width: 30rem`.
- Mobile-first con media queries `min-width`. La altura mínima de la tarjeta
  solo se aplica por encima de `min-height: 36rem`, para no forzar scroll en
  un móvil en horizontal.
- Sin scroll horizontal a 360, 480, 740, 768, 1024 ni 1440 px (verificado con
  `document.documentElement.scrollWidth > window.innerWidth`).
- Todos los elementos interactivos miden 44 px o más en ambos ejes.

No hay menú móvil que arreglar: el sitio no tiene navegación.

## 8. UX / UI

- **Los checkboxes eran inalcanzables por teclado** (`display: none`). Ahora se
  ocultan con recorte, siguen en el orden de tabulación y el anillo de foco se
  dibuja sobre la etiqueta.
- Foco visible en todos los elementos interactivos. Antes `all: unset` quitaba
  el `outline` del navegador y nada lo reponía.
- La selección de un tema ya no depende solo del color: aparece una marca de
  verificación y cambia el grosor tipográfico.
- **Botones "Back"** en los pasos 2 y 3. Antes no había forma de volver.
- **Validación de formato de email**, además de la de campo vacío. Los mensajes
  son concretos y el foco salta al primer campo con problema. Una vez marcado
  un campo, se revalida mientras se escribe.
- **El paso 2 ahora valida.** Antes se podía continuar sin marcar nada y el
  resumen escribía `None selected`, un valor de relleno.
- **"Confirm" ya no deja la página en blanco.** Antes desvanecía toda la
  interfaz y ahí terminaba todo. Ahora lleva a un estado de conclusión que
  dice lo que realmente ocurre —que no hay servidor y no se guarda nada— y
  ofrece "Start over", que reinicia el formulario de verdad.
- Transiciones de 180 ms (antes, un `setTimeout` de 560 ms).

## 9. JavaScript

- Un único `assets/js/main.js` dentro de una IIFE: cero variables globales.
- **jQuery slim 3.0.0-beta1 eliminado.** Se descargaba en cada visita desde un
  CDN y no había ni una sola llamada a `$` en todo el proyecto.
- `const`/`let` en lugar de `var`; ninguna redeclaración.
- Sustituidas las asignaciones `element.classList = 'x'`, que borraban todas
  las clases del elemento y funcionaban por accidente, por `classList.toggle`.
- Eliminadas las tres `const` que solo guardaban el `undefined` que devuelve
  `addEventListener`.
- Comprobación de existencia antes de operar: si falta el marcado del que
  depende, el script no hace nada en lugar de fallar a medias.
- Los botones "Back" usan un único listener delegado.
- Cero errores y cero avisos en consola.

### Nota sobre módulos ES

`main.js` se carga con `defer`, no como módulo ES. Con `type="module"` el
navegador aplica CORS y el sitio deja de funcionar al abrir `index.html`
directamente desde el disco, que es un requisito de la fase 13.1. Con ~315
líneas en un archivo, la separación en módulos no compensa perder eso.

## 10. Rendimiento

- Peso de la primera carga: **~46 KB** frente a ~480 KB.
- Una petición externa menos (jQuery) y 273 KB menos de imágenes.
- La fuente pasa de un `@import` dentro de un CSS —que serializa la descarga—
  a un `<link>` en el `<head>` con `preconnect` a los dos orígenes de Google
  Fonts.
- **Corregida la petición de la fuente**: pedía `family=Inter` sin pesos, así
  que el navegador sintetizaba una falsa negrita para todo el `font-weight: 600`
  del diseño. Ahora pide `wght@400;600`.
- `font-display: swap` mantenido.
- Scripts con `defer`.

## 12. Documentación

- `README.md` actualizado: stack, árbol de archivos, comandos y problemas
  conocidos. Se conservó la voz y las partes que seguían siendo ciertas.
- Los dos "Known issues" del README anterior ya no aplican: el contador de
  pasos sí mostraba "Step 1 of 3" correctamente (lo que se veía era el
  elemento de relleno oculto), y los datos de ejemplo del resumen se han
  eliminado del marcado.

## 13. Deploy

- Verificado abriendo `index.html` directamente desde disco y con servidor local.
- Sin rutas absolutas de máquina local.
- Todas las rutas internas relativas y en minúsculas.
- No se creó `vercel.json` ni ningún otro archivo de hosting: `DESTINO_DEPLOY`
  venía vacío en la configuración.

## 14. Promoción

`REPO_TIPO` es `personal`, así que se aplicaron los tres bloques: sección
"Hire me" y badge en el README, firma en el footer del sitio y datos
estructurados `Person` en el `<head>` de `index.html`.

---

## Decisión que conviene revisar

`DOMINIO_PUBLICACION` venía vacío en la configuración, pero el README del
repositorio ya documentaba el sitio en vivo en `stepsregister.wib.digital`.
Se usó ese dominio para `canonical`, `og:url`, `og:image`, `robots.txt` y
`sitemap.xml`, porque un `sitemap.xml` sin URLs absolutas es inválido según
la especificación y habría sido peor que no generarlo.

Si el dominio no es correcto, aparece en estos cuatro archivos:
`index.html`, `404.html`, `robots.txt` y `sitemap.xml`.
