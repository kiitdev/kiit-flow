// Shared helpers for the Kiit SVG templates (flow-diagram.html, work-item.html).
// Each template is plain HTML. It builds an SVG string, shows it, and offers a download.
// Export from the command line with: ./banner.sh <template>.html <out>.svg

const KIIT_THEME = {
  paper: "#E8F1FF", grid: "#C4D8F6", frame: "#4DA3FF", frameLeft: "#E8794A", frameWidth: 8,   // the outline: soft blue, with a soft orange left edge
  blue: "#007FFF",              // blueprint blue
  ink: "#111827", sub: "#4B5563", dim: "#6B7A99",
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

const KIIT_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'DejaVu Sans Mono', monospace";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Graph-paper background with the blue bar and a thin frame. Returns {defs, body}.
function kiitBackground(t, w, h) {
  const f = t.frameWidth, o = f / 2, r = 20 - o;          // outline inset and corner radius
  const leftEdge = `M 20 ${o} A ${r} ${r} 0 0 0 ${o} 20 V ${h - 20} A ${r} ${r} 0 0 0 20 ${h - o}`;
  const rest = `M 20 ${o} H ${w - 20} A ${r} ${r} 0 0 1 ${w - o} 20 V ${h - 20} A ${r} ${r} 0 0 1 ${w - 20} ${h - o} H 20`;
  return {
    defs: `<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="${t.grid}" stroke-width="1"/>
    </pattern>
    <clipPath id="frame"><rect width="${w}" height="${h}" rx="20"/></clipPath>`,
    body: `<g clip-path="url(#frame)">
    <rect width="${w}" height="${h}" fill="${t.paper}"/>
    <rect width="${w}" height="${h}" fill="url(#grid)"/>
  </g>
  <path d="${rest}" fill="none" stroke="${t.frame}" stroke-width="${f}"/>
  <path d="${leftEdge}" fill="none" stroke="${t.frameLeft}" stroke-width="${f}"/>`,
  };
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
