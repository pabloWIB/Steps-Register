# Steps-Register

Three-step registration form that ends on a summary of what the user entered.

[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)

[![Live demo](https://img.shields.io/badge/demo-stepsregister.wib.digital-2ea44f)](https://stepsregister.wib.digital)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

Registration forms ask for two different kinds of thing — who you are, and what you want — and mixing them on one screen makes both harder to answer. This one separates them: name and email first, topic interests second, and a summary third.

The summary is the point of the pattern. Before anything is submitted, the user sees their own name, email and selected topics written back to them, which is the cheapest way to catch a mistyped address.

There is no backend. Nothing is sent and nothing is stored — the summary is assembled from the form's own state, and the final screen says so rather than pretending a registration went through.

## Features

- Three steps: personal details, topic interests, summary — plus a completion screen.
- Summary echoes name, email and selected topics before submission.
- Topic selection by checkbox, with any number selectable.
- Inline validation with specific messages; focus moves to the first field that needs fixing.
- Back navigation between steps, with entered values kept.
- Fully operable by keyboard, with a visible focus ring on every control.
- Respects `prefers-reduced-motion`.
- No npm dependencies and no build step.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | Single `index.html` holding all four screens, plus `404.html` |
| Styling | CSS3 | Custom properties for the design tokens; three files, no preprocessor |
| Scripting | JavaScript | ~315 lines in `assets/js/main.js`, no dependencies |
| Typography | Inter, from Google Fonts | Weights 400 and 600 |

## Prerequisites

None. Open `index.html` in any browser.

## Installation

```bash
git clone https://github.com/pabloWIB/Steps-Register.git
cd Steps-Register
```

Open `index.html` directly, or serve the folder over HTTP:

```bash
python -m http.server 4321
```

## Usage

All four screens are in the document from the start; the script shows one at a time and keeps the progress indicator in step. Values entered earlier survive going back, so the summary always reflects the current state of the fields.

To send the registration somewhere, hook into the confirm button in `assets/js/main.js` and post the values collected there — the form currently prevents its default and goes no further by design.

## Project structure

```
.
├── index.html                    # All four screens: 3 steps + completion
├── 404.html                      # Not-found page, links back to the form
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── base.css              # Design tokens, reset, typography, utilities
│   │   ├── layout.css            # Page shell, card, steps, progress, footer
│   │   └── components.css        # Buttons, fields, options, summary
│   ├── js/
│   │   └── main.js               # Step navigation, validation, summary
│   └── img/
│       ├── favicon.png           # 180×180
│       └── steps-register-preview.jpg   # 1200×630 Open Graph image
└── docs/
    ├── auditoria.md              # State of the project before the cleanup
    └── cambios.md                # What changed, grouped by area
```

## Known issues

None outstanding. The two problems listed in the previous revision of this file — the step counter and the sample values baked into the summary markup — are fixed; `docs/cambios.md` records the details.

## Deployment

Deployed on Vercel at [stepsregister.wib.digital](https://stepsregister.wib.digital). Static: upload the repository root as-is, no build command and no output directory.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
