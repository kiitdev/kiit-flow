// Shared helpers for the Kiit SVG templates (flow-diagram.html, work-item.html).
// Each template is plain HTML. It builds an SVG string, shows it, and offers a download.
// Export from the command line with: ./banner.sh <template>.html <out>.svg

const KIIT_THEME = {
  paper: "#E8F1FF", grid: "#C4D8F6", frame: "#B7CDEE",
  blue: "#007FFF",              // blueprint blue
  ink: "#111827", sub: "#4B5563", dim: "#6B7A99",
  highlight: "#D9480F",         // the fast path and other emphasis
  fastTint: "#FFF3EA", fastBorder: "#F0B896",   // the fast path column
  sheen: "#BFE0FF",
  card: "#F6FAFF", border: "#8FB0E3", rule: "#C4D8F6",
  done: "#1B8A5A", todo: "#C26A00", blocked: "#C0392B", skip: "#8A94A8",
};

const KIIT_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'DejaVu Sans Mono', monospace";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Graph-paper background with the blue bar and a thin frame. Returns {defs, body}.
function kiitBackground(t, w, h) {
  return {
    defs: `<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="${t.grid}" stroke-width="1"/>
    </pattern>
    <clipPath id="frame"><rect width="${w}" height="${h}" rx="20"/></clipPath>`,
    body: `<g clip-path="url(#frame)">
    <rect width="${w}" height="${h}" fill="${t.paper}"/>
    <rect width="${w}" height="${h}" fill="url(#grid)"/>
    <rect x="0" y="0" width="8" height="${h}" fill="${t.blue}"/>
  </g>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="20" fill="none" stroke="${t.frame}"/>`,
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
