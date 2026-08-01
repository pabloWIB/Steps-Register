# Auditoría — Steps-Register

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

Fecha: 2026-07-31

---

## 1. Qué es el proyecto

Formulario de registro de tres pasos (datos personales → intereses → resumen), de
una sola página, sin backend. HTML + CSS compilado desde SCSS con Prepros +
JavaScript sin dependencias. El diseño es una tarjeta oscura centrada sobre un
fondo azul noche con dos halos morados, e indicador de progreso de tres puntos.

## 2. Inventario de archivos

### HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `STEPS` | **ninguno** | Única página. Contiene los tres pasos a la vez; JS muestra uno cada vez |

No existía `404.html`.

### CSS

| Archivo | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 16 | Sí | Normalize minificado + añadidos propios: `* { transition: .3s }` global, scrollbar `#5308FC` (color ausente del resto de la paleta), `::selection { background: none }` |
| `CSS/styles.css` | 495 | Sí | Compilado desde `styles.scss` con autoprefixer |
| `CSS/fonts.css` | 1 | Sí | Solo un `@import` a Google Fonts. Pide `family=Inter` sin pesos: el 600 del diseño se sintetizaba como falsa negrita |
| `CSS/styles.scss` | 368 | No (fuente) | Fuente Sass del anterior |
| `CSS/prepros.config` | 884 | No | Configuración del compilador Prepros |

### JavaScript

| Archivo | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | 106 | Sí | Toda la lógica de pasos. Vanilla, sin dependencias |

### Imágenes

| Archivo | Dimensiones | Peso | Formato | ¿Referenciada? |
|---|---|---|---|---|
| `IMG/background.png` | 2063 × 1231 | 231 KB | PNG | Sí — `body` en `styles.css` |
| `IMG/icon.png` | 492 × 492 | 42 KB | PNG | **No** — huérfana. Es el logotipo de marca WIB |
| `IMG/next.svg` | 48 × 48 | 171 B | SVG | **No** — huérfana. Flecha "arrow forward" de Material |
| `IMG/blur-radial.svg` | 749 × 749 | 495 B | SVG | **No** — huérfana. Halo radial `#652CD1` al 30 % |
| `Steps-Register.png` | 1024 × 1024 | 159 KB | PNG | Sí — como favicon |

### Dependencias externas

| Recurso | Origen | Uso real |
|---|---|---|
| jQuery slim 3.0.0-**beta1** | cdnjs | **Ninguno.** Cero llamadas a `$` o `jQuery` en todo el proyecto |
| Inter | Google Fonts, vía `@import` en CSS | Sí, tipografía única |

### Archivos basura

Ninguno. No hay `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni archivos
con sufijo de versión.

## 3. Problemas detectados

### Bloqueantes

| # | Problema | Dónde | Evidencia |
|---|---|---|---|
| 1 | **La tarjeta se parte en dos columnas y el botón se sale fuera** en viewport bajo (móvil en horizontal). `flex-flow: column wrap` + `height: 55vh` fijo hace que el contenido que no cabe salte a una segunda columna | `styles.scss:22-33` | Reproducido a 740 × 360 |
| 2 | **Los checkboxes son inalcanzables por teclado**: `input[type="checkbox"] { display: none }` los saca del árbol de foco y las etiquetas no son focalizables. El paso 2 no se puede completar sin ratón | `styles.scss:178-180` | — |
| 3 | **No hay foco visible en ningún elemento**: `all: unset` en inputs de texto y de submit elimina el `outline` del navegador y no se repone | `styles.scss:87, 119` | — |
| 4 | **`body { overflow: hidden }`** recorta el contenido en lugar de permitir scroll cuando no cabe | `styles.scss:12` | — |

### Contenido inventado

| # | Problema | Dónde |
|---|---|---|
| 5 | Datos personales ficticios escritos en el marcado del resumen: `Emely Johnson`, `emely@emelyjohnsonth.com` | `index.html:75-76` |
| 6 | Dos temas preseleccionados de relleno: `<li>User Experience</li>`, `<li>Graphic Design</li>` | `index.html:83-84` |
| 7 | Elemento de relleno `<h3>Step of</h3>`, ocultado con `visibility: hidden` desde CSS | `index.html:110` |

### Semántica y accesibilidad

| # | Problema | Dónde |
|---|---|---|
| 8 | `<main>`, `<section>` y `<footer>` se usan como contenedores de los pasos 1, 2 y 3. El resumen del registro es el `<footer>` de la página | `index.html:15, 43, 69` |
| 9 | `<nav>` contiene el indicador de progreso, que no es navegación: no lleva a ninguna parte | `index.html:92` |
| 10 | Ningún `<h1>` en la página. La jerarquía empieza en `<h2>` y usa `<h3>` para etiquetas de estado | `index.html` completo |
| 11 | HTML inválido: dos `</button>` de cierre sobrantes tras `<input type="submit">` | `index.html:39, 88` |
| 12 | Contraste insuficiente — placeholder `#4D5562` sobre `#212936` = **1,94:1** (mínimo 4,5:1) | `styles.scss:129-131` |
| 13 | Contraste insuficiente — "Step 1 of 3" `#394150` sobre `#121826` = **1,73:1** | `styles.scss:270-271` |
| 14 | Contraste insuficiente — mensajes de error `#D31B1B` sobre `#212936` = **2,75:1** | `styles.scss:363` |
| 15 | Contraste insuficiente — etiqueta de tema `#A1A1A9` sobre `#394150` = **4,00:1** | `styles.scss:166-170` |
| 16 | Contraste límite — blanco sobre el inicio del degradado `#845EEE` = **4,36:1** | `styles.scss:91` |
| 17 | Los cambios de paso no se anuncian a lectores de pantalla; no hay región `aria-live` ni gestión del foco | `script.js` completo |
| 18 | Los checkboxes no están agrupados: sin `fieldset`/`role="group"` que los relacione con la pregunta | `index.html:48-62` |
| 19 | `::selection { background: none }` repetido en 10 reglas: desactiva el resaltado de selección de texto | `styles.scss` |

### CSS

| # | Problema | Dónde |
|---|---|---|
| 20 | Selectores posicionales `:nth-child` en toda la hoja: el estilo depende del orden del marcado, no del significado. Mover un `<div>` rompe el diseño | `styles.scss` completo |
| 21 | Cadenas de selectores de hasta 8 niveles (`body .width-adjust main .internal-width > :nth-child(2) > :nth-child(1) input:focus::placeholder`) | `styles.css:201-225` |
| 22 | Regla duplicada: `main .internal-width > :nth-child(2)` declarada dos veces | `styles.css:93` y `143` |
| 23 | Cero variables CSS. Cada color y espaciado repetido literalmente | `styles.scss` completo |
| 24 | Escala de espaciado arbitraria: 3,5 / 7,5 / 8,5 / 9,5 / 12,5 / 14,5 / 25 px | `styles.scss` completo |
| 25 | Cero media queries. Todo el dimensionado en `vh`, incluido el ancho (`max-width: 73.5vh`): el ancho de la tarjeta depende de la **altura** de la ventana | `styles.scss:31-32` |
| 26 | `* { transition: .3s }` aplica transición a todas las propiedades de todos los elementos | `normalize.css:15` |
| 27 | Áreas táctiles por debajo del mínimo: los botones miden 90 × 36 px (mínimo 44 × 44) | `styles.scss:86-96` |

### JavaScript

| # | Problema | Dónde |
|---|---|---|
| 28 | jQuery slim beta se descarga en cada carga y no se usa nunca | `index.html:10` |
| 29 | `classList = 'x'` (asignación a la propiedad, no `className`): borra todas las clases del elemento y funciona por accidente | `script.js:26, 36, 37, 41…` |
| 30 | Variables declaradas para descartar su valor: `const firstForm = …addEventListener(…)` guarda `undefined` | `script.js:13, 49, 97` |
| 31 | `const formIndex = document.getElementById('formIndex').textContent = '1'` redeclarada tres veces en ámbitos distintos | `script.js:5, 40, 87` |
| 32 | Sin comprobación de existencia antes de operar sobre los elementos | `script.js` completo |
| 33 | Validación solo de campo vacío: no valida el formato del email | `script.js:24` |
| 34 | El paso 2 no valida nada: se puede continuar sin marcar nada y el resumen escribe `None selected` | `script.js:71-73` |
| 35 | El botón `Confirm` desvanece toda la interfaz y deja **una página en blanco**. No hay confirmación ni forma de volver | `script.js:97-106` |
| 36 | No hay forma de volver atrás en ningún paso | `script.js` completo |
| 37 | Transición de 560 ms mediante `setTimeout` (recomendado 150-250 ms) | `script.js:105` |

### SEO y archivos de proyecto

| # | Problema |
|---|---|
| 38 | `<title>` de 5 caracteres (`STEPS`), sin relación con lo que hace la página |
| 39 | Sin `<meta name="description">`, sin Open Graph, sin canonical |
| 40 | Favicon: PNG de 1024 × 1024 y 159 KB declarado como `type="image/x-icon"` |
| 41 | Sin `robots.txt`, sin `sitemap.xml`, sin `404.html`, sin `.gitignore` |
| 42 | Indentación con tabuladores en HTML y con 5 espacios en JS |

### Enlaces, rutas y credenciales

| Comprobación | Resultado |
|---|---|
| Enlaces `href` rotos | Ninguno — no hay ningún enlace en toda la página |
| Rutas de imagen rotas | Ninguna |
| `<link>` / `<script>` a archivos inexistentes | Ninguno |
| Rutas absolutas de máquina local | Ninguna |
| Credenciales, tokens o API keys | **Ninguna** |
| Errores en consola | Ninguno |

## 4. Resumen

1. Es un formulario de registro de tres pasos, de una página, sin backend: el
   resumen se arma con los valores del propio formulario y no se envía nada.
2. Funciona en escritorio y el JavaScript hace lo que promete, pero está
   construido sobre selectores posicionales y unidades `vh` que lo hacen frágil.
3. **Lo más grave: la tarjeta se rompe en viewport bajo** — `flex-flow: column wrap`
   con `height: 55vh` reparte el contenido en dos columnas y expulsa el botón
   "Continue" fuera del recuadro. Verificado a 740 × 360.
4. **Segundo más grave: el paso 2 es imposible de completar sin ratón**, porque
   los checkboxes están con `display: none` y nada los sustituye como destino de foco.
5. Hay datos personales inventados escritos a mano en el marcado del resumen, y
   jQuery se descarga en cada visita sin que ninguna línea lo use.
