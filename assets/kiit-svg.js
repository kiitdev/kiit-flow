// Shared helpers for the Kiit SVG templates (the templates in each group folder).
// Each template is plain HTML. It builds an SVG string, shows it, and offers a download.
// Export from the command line with: ./banner.sh <group>/<template>.html <group>/<out>.svg
// Regenerate every diagram with:     ./build.sh
//
// Every colour and style setting is in KIIT_THEME below, and any of them can be changed:
//   1. For good: edit the default in KIIT_THEME.
//   2. For one run: pass JSON, for example  ./build.sh '{"accent":"#14B8A6"}'
//      (./banner.sh takes the same JSON as its third argument).
//   3. For one template: use kiitTheme({ accent: "#14B8A6" }) as that template's theme.

const KIIT_THEME = {
  paper: "#E8F1FF", grid: "#C4D8F6",
  frame: "#4DA3FF", frameLeft: "#E8794A",       // the old outline, still read by start.html
  // The palette is three colours: ink, blue and orange, with neutral greys.
  sheetFrom: "#FDFEFF", sheetTo: "#DFECFB",     // the page: a soft diagonal gradient
  edge: "#8CA3C7", edgeWidth: 1.5,              // the page border, visible on light and dark pages
  pageRadius: 10,               // the page's corner radius
  showGrid: true,               // graph paper lines on the right, fading out toward the left
  gridSize: 32, gridWidth: 1,   // the spacing and thickness of the lines. Their colour is `grid`
  gridFade: 0.5,                // where the fade starts, as a share of the width from the left
  showBar: true, barWidth: 8,   // the bar down the left edge. Its colour is `accent`
  line: "#475569",              // card and box borders
  hair: "#CBD5E1",              // thin rules inside a card
  accent: "#FF9A4D",            // orange: the small bar on the left edge of every page
  navy: "#111827",
  blue: "#007FFF",              // blueprint blue
  blueTint: "#E8F2FF", blueDeep: "#0B63CE",     // a tint of blue for fills, and a deeper blue for small text on it
  ink: "#1E293B", sub: "#64748B", dim: "#6B7A99",
  fontFamily: "Fira Code",      // the font. banner.sh embeds its files, so it looks the same everywhere
  fontDir: "fonts/",            // where the files are, relative to this script
  fontFaces: [[400, "FiraCode-Regular.woff2"], [700, "FiraCode-Bold.woff2"]],   // [weight, file]. Built by fonts/make-fonts.py
  fontNotice: "Fira Code. Copyright 2014-2020 The Fira Code Project Authors (https://github.com/tonsky/FiraCode). SIL Open Font License 1.1 (https://scripts.sil.org/OFL). A subset of the original font.",   // written into each SVG as a comment, as the font's licence asks
  cardFill: "#FFFFFF",          // the fill of a card
  softFill: "#EEF2F7",          // a light grey fill, such as the lightest mode box
  onFill: "#FFFFFF",            // text on a solid blue or ink fill
  highlight: "#D9480F",         // emphasis, such as the banner steps line
  fast: "#1B8A5A",              // the fast path: calm green, low risk
  fastTint: "#EAF7F1", fastBorder: "#8FD1B3",   // the fast path column
  flow: "#A66F00",              // the flow path: amber, proceed with care
  flowTint: "#FFF8DC", flowBorder: "#E6C65C",   // the flow column
  heavy: "#7C4DFF",             // the careful steps: review and revise
  heavyTint: "#F5F0FF", heavyBorder: "#B49CFF",
  sheen: "#BFE0FF",
  card: "#F6FAFF", border: "#8FB0E3", rule: "#C4D8F6",
  done: "#1B8A5A", todo: "#C26A00", blocked: "#C0392B", skip: "#8A94A8",
};

// A copy of the theme with some settings changed, for one template.
const kiitTheme = (overrides) => ({ ...KIIT_THEME, ...overrides });

// Settings for one run, as JSON after #theme= in the page's address. banner.sh and
// build.sh add it from their last argument. Bad JSON is reported and ignored.
(function () {
  const m = /^#theme=(.*)$/.exec(location.hash);
  if (!m) return;
  try { Object.assign(KIIT_THEME, JSON.parse(decodeURIComponent(m[1]))); }
  catch (e) { console.error("theme override ignored: " + e.message); }
})();

// The font stack. The first font is the embedded one, and the rest are for a page that cannot load it.
const KIIT_FONT = `'${KIIT_THEME.fontFamily}', ui-monospace, SFMono-Regular, Menlo, Consolas, 'DejaVu Sans Mono', monospace`;

// So a template shown in a browser uses the same font as the exported SVG, load the font
// files that sit next to this script. Ligatures are off, so text shows as typed.
(function () {
  const base = document.currentScript.src.replace(/[^/]*$/, "") + KIIT_THEME.fontDir;
  const faces = KIIT_THEME.fontFaces.map(([weight, file]) =>
    `@font-face{font-family:'${KIIT_THEME.fontFamily}';font-weight:${weight};src:url(${base}${file}) format('woff2')}`);
  const style = document.createElement("style");
  style.textContent = faces.join("") + "svg text{font-variant-ligatures:none}";
  document.head.appendChild(style);
})();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The page: an off-white sheet with a soft gradient, graph paper lines on the right that
// fade out toward the left, an orange bar down the left edge, and a thin border, so
// the image keeps its edge on light and dark pages. Returns {defs, body}.
function kiitBackground(t, w, h) {
  const o = t.edgeWidth / 2, pw = w - t.edgeWidth, ph = h - t.edgeWidth, r = t.pageRadius, g = t.gridSize;
  const grid = t.showGrid ? `<rect width="${w}" height="${h}" fill="url(#kiit-grid)" mask="url(#kiit-grid-mask)"/>` : "";
  const bar = t.showBar ? `<rect x="0" y="0" width="${t.barWidth}" height="${h}" fill="${t.accent}"/>` : "";
  return {
    defs: `<linearGradient id="kiit-sheet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.sheetFrom}"/>
      <stop offset="1" stop-color="${t.sheetTo}"/>
    </linearGradient>
    <pattern id="kiit-grid" width="${g}" height="${g}" patternUnits="userSpaceOnUse">
      <path d="M${g} 0H0V${g}" fill="none" stroke="${t.grid}" stroke-width="${t.gridWidth}"/>
    </pattern>
    <linearGradient id="kiit-fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="${t.gridFade}" stop-color="#000"/>
      <stop offset="1" stop-color="#FFF"/>
    </linearGradient>
    <mask id="kiit-grid-mask"><rect width="${w}" height="${h}" fill="url(#kiit-fade)"/></mask>
    <clipPath id="kiit-page"><rect x="${o}" y="${o}" width="${pw}" height="${ph}" rx="${r}"/></clipPath>`,
    body: `<rect x="${o}" y="${o}" width="${pw}" height="${ph}" rx="${r}" fill="url(#kiit-sheet)"/>
  <g clip-path="url(#kiit-page)">
    ${grid}
    ${bar}
  </g>
  <rect x="${o}" y="${o}" width="${pw}" height="${ph}" rx="${r}" fill="none" stroke="${t.edge}" stroke-width="${t.edgeWidth}"/>`,
  };
}

// A card in the logo's style: a dark rounded border, a white panel, and a solid blue
// label block in the top-left corner, like the K tile. The text font comes from the
// parent group. Returns the markup and where content can go: x, y, w, h of the panel,
// and top, the first y below the label.
function kiitCard(t, x, y, w, h, label, o = {}) {
  const b = o.border || 6, r = o.radius || 18, ir = r - b;
  const fs = o.labelSize || 18, lh = o.labelHeight || 38;
  const lw = o.labelWidth || Math.round(label.length * fs * 0.6 + 36);
  const px = x + b, py = y + b, pw = w - 2 * b, ph = h - 2 * b;
  return {
    svg: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${t.navy}"/>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${ir}" fill="${t.cardFill}"/>
    <path d="M${px} ${py + lh} V${py + ir} A${ir} ${ir} 0 0 1 ${px + ir} ${py} H${px + lw} V${py + lh} Z" fill="${t.blue}"/>
    <text x="${px + lw / 2}" y="${py + lh / 2 + fs * 0.35}" font-size="${fs}" font-weight="700" fill="${t.onFill}" text-anchor="middle">${esc(label)}</text>`,
    x: px, y: py, w: pw, h: ph, top: py + lh,
  };
}

// A thin divider in the logo's light orange.
function kiitRule(t, x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${t.accent}" stroke-width="2"/>`;
}

// A sharp arrowhead whose tip is at (x, y).
function kiitHead(x, y, dir, size, fill) {
  const s = size, h = size * 0.6;
  const shapes = {
    down:  [[x - h, y - s], [x + h, y - s], [x, y]],
    up:    [[x - h, y + s], [x + h, y + s], [x, y]],
    right: [[x - s, y - h], [x - s, y + h], [x, y]],
    left:  [[x + s, y - h], [x + s, y + h], [x, y]],
  };
  const pts = shapes[dir];
  return `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}"/>`;
}

// Show the SVG on the page, keep a copy for banner.sh, and wire the download button.
function kiitMount(svgText, filename) {
  document.getElementById("banner").innerHTML = svgText;
  document.getElementById("svg").textContent = svgText;   // read by banner.sh
  // the fonts to embed, also read by banner.sh
  const fonts = document.createElement("pre");
  fonts.id = "fonts";
  fonts.style.display = "none";
  fonts.textContent = JSON.stringify({ family: KIIT_THEME.fontFamily, dir: KIIT_THEME.fontDir, faces: KIIT_THEME.fontFaces, notice: KIIT_THEME.fontNotice });
  document.body.appendChild(fonts);
  document.getElementById("dl").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml" }));
    a.download = filename;
    a.click();
  };
}

// ---- Icons shared by the work item card and the why diagram ----------------

const FOLDER = { back: "#F2A33A", front: "#FFC25E", edge: "#D9822B" };   // the orange folder

// A small white pictogram for a badge, centered on (0,0)
const GLYPHS = {
  pencil:    '<polygon points="-5,5 -4,1.5 2.5,-5 5,-2.5 -1.5,4" fill="#FFFFFF"/>',
  square:    '<polygon points="-5,5 5,5 -5,-5" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linejoin="round"/>',
  steps:     '<polyline points="-5,5 -5,2 -2,2 -2,-1 1,-1 1,-4 5,-4" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>',
  magnifier: '<circle cx="-1" cy="-1" r="3.3" fill="none" stroke="#FFFFFF" stroke-width="1.7"/><line x1="1.6" y1="1.6" x2="5" y2="5" stroke="#FFFFFF" stroke-width="1.9" stroke-linecap="round"/>',
  checklist: '<polyline points="-5,-2 -3.5,0 -1,-4" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="1.5" y1="-2" x2="5" y2="-2" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/><line x1="-5" y1="3.5" x2="5" y2="3.5" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>',
  compass:   '<circle cx="0" cy="0" r="5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/><polygon points="0,-3 1.7,0 0,3 -1.7,0" fill="#FFFFFF" transform="rotate(45)"/>',
  download:  '<line x1="0" y1="-5" x2="0" y2="2.5" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round"/><polyline points="-3.5,-1 0,2.5 3.5,-1" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><line x1="-5" y1="5.5" x2="5" y2="5.5" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round"/>',
  clock:     '<circle cx="0" cy="0" r="5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/><polyline points="0,-2.8 0,0 2.4,1.6" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
};

// The file icon with text lines, and a round badge for what the file is
function fileIcon(x, y, kind, color, t) {
  return `<path d="M${x} ${y} H${x + 15} L${x + 22} ${y + 7} V${y + 28} H${x} Z" fill="${t.card}" stroke="${color}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M${x + 15} ${y} V${y + 7} H${x + 22}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round"/>
    <line x1="${x + 4}" y1="${y + 12}" x2="${x + 15}" y2="${y + 12}" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="${x + 4}" y1="${y + 17}" x2="${x + 12}" y2="${y + 17}" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="${x + 4}" y1="${y + 22}" x2="${x + 9}" y2="${y + 22}" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="${x + 21}" cy="${y + 26}" r="10" fill="${color}" stroke="${t.card}" stroke-width="2"/>
    <g transform="translate(${x + 21} ${y + 26})">${GLYPHS[kind] || ""}</g>`;
}

// The orange folder, with its top-left corner at (x, y) and an optional scale
function kiitFolderIcon(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale}) translate(-48 -57)">
    <path d="M48 60 a3 3 0 0 1 3 -3 h12 l4 5 h19 a3 3 0 0 1 3 3 v22 a3 3 0 0 1 -3 3 h-35 a3 3 0 0 1 -3 -3z" fill="${FOLDER.back}" stroke="${FOLDER.edge}" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="48" y="66" width="41" height="22" rx="3" fill="${FOLDER.front}" stroke="${FOLDER.edge}" stroke-width="1.5"/>
  </g>`;
}
