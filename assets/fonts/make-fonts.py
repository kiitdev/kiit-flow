#!/usr/bin/env python3
"""Build the small font files that banner.sh embeds in every SVG.

usage: python3 make-fonts.py
needs: pip install fonttools brotli    (only to rebuild the fonts, not to export diagrams)

It reads SOURCE, a variable font, and writes one woff2 file per weight. Each file keeps only
the characters in CHARS and has no ligatures, so it stays a few KB. To use another font,
change SOURCE, FAMILY, WEIGHTS and CHARS here, then make the fontFamily and fontFaces
settings in kiit-svg.js match. Keep the font's licence file next to it.
"""
import os

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCE = "FiraCode.ttf"
FAMILY = "FiraCode"
WEIGHTS = {"Regular": 400, "Bold": 700}
CHARS = [chr(c) for c in range(0x20, 0x7F)] + list("→←↑↓✓✗•·…–—‘’“”≤≥≠×▸▶")

for name, weight in WEIGHTS.items():
    font = instancer.instantiateVariableFont(TTFont(os.path.join(HERE, SOURCE)), {"wght": weight})
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = []              # no ligatures or other features
    options.name_IDs = [0, 1, 2, 3, 4, 6, 13, 14]   # keep the copyright and licence names
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=[ord(c) for c in CHARS])
    subsetter.subset(font)
    font.flavor = "woff2"
    out = os.path.join(HERE, f"{FAMILY}-{name}.woff2")
    font.save(out)
    print(f"wrote {os.path.basename(out)} ({os.path.getsize(out)} bytes)")
