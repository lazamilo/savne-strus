# Savne Štrus redesign

Static front-end pitch for savne-strus.si. Plain HTML, CSS and JS, no build step.

- Pages: `index.html`, `kolekcije.html`, `vrste-savn.html`, `zunanje-savne.html`, `reference.html`, `o-nas.html`, `posvet.html`
- Shared header, mega menu, footer and animations: `assets/js/main.js` (GSAP, ScrollTrigger and Lenis are vendored in `assets/vendor`)
- Styles: `assets/css/style.css`, font Maison Neue (`assets/fonts`, licensed font)
- Images: the client's own photos in `assets/img/w`

Run locally: `node serve.mjs 4760`, then open http://localhost:4760
